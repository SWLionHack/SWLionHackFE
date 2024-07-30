import React, { useState, useEffect, useCallback, useContext } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from './SearchContext';
import '../style/map/NearbyPlace.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const NearbyPlace = () => {
  const {
    currentLocation, setCurrentLocation,
    keyword, setKeyword,
    searchResults, setSearchResults,
    markers, setMarkers
  } = useContext(SearchContext);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchRatings = useCallback(async (academyNames, places) => {
    try {
      const response = await axios.post(`http://${API_BASE_URL}/map_academy/ratings`, 
      {
        academyNames,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const updatedResults = places.map(result => {
        const ratingData = response.data.find(d => d.academyname === result.name);
        return ratingData ? { ...result, rating: ratingData.averageRating } : result;
      });

      setSearchResults(updatedResults);
      localStorage.setItem('searchResults', JSON.stringify(updatedResults));
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  }, [setSearchResults, token]);

  const handleSearch = useCallback(() => {
    if (keyword && map) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: keyword,
        location: new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng),
        radius: 5000,
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const places = results.slice(0, 10).map((place) => ({
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));

          setSearchResults(places);
          setMarkers(places.map((place) => ({ lat: place.lat, lng: place.lng, name: place.name, address: place.address })));
          fetchRatings(places.map(place => place.name), places);
          localStorage.setItem('keyword', keyword);
          localStorage.setItem('markers', JSON.stringify(places.map((place) => ({ lat: place.lat, lng: place.lng, name: place.name, address: place.address }))));
        } else {
          console.error('Search failed: ', status);
        }
      });
    }
  }, [keyword, map, currentLocation, setSearchResults, setMarkers, fetchRatings]);

  const handleResultClick = (academyName) => {
    navigate(`/reviews/${academyName}`);
  };

  useEffect(() => {
    const initialLocation = {
      lat: 36.61083, // 설정하고 싶은 위도
      lng: 127.2865 // 설정하고 싶은 경도
    };
    setCurrentLocation(initialLocation);

    // 로컬 스토리지에서 검색 상태를 불러옴
    const savedKeyword = localStorage.getItem('keyword');
    const savedSearchResults = localStorage.getItem('searchResults');
    const savedMarkers = localStorage.getItem('markers');

    if (savedKeyword) {
      setKeyword(savedKeyword);
      // 검색어가 존재하면 API 요청을 다시 보냄
      handleSearch();
    }
    if (savedSearchResults) setSearchResults(JSON.parse(savedSearchResults));
    if (savedMarkers) setMarkers(JSON.parse(savedMarkers));
  }, [setCurrentLocation, setKeyword, setSearchResults, setMarkers, handleSearch]);

  return (
    <div className="nearby-place">
      <div className="search-container">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          onKeyPress={handleKeyPress}
          placeholder="키워드를 입력하세요"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
      <div className="content-container">
        <div className="map-container">
          <GoogleMap
            center={currentLocation}
            zoom={14}
            onLoad={(map) => setMap(map)}
            mapContainerStyle={{ width: '100%', height: '100%' }}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                  fillColor: '#FF0000',
                  fillOpacity: 1,
                  strokeWeight: 0,
                  scale: 2,
                  labelOrigin: new window.google.maps.Point(12, 24)
                }}
                onMouseOver={() => setSelectedMarker(marker)}
                onMouseOut={() => setSelectedMarker(null)}
              />
            ))}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat + 0.0005, lng: selectedMarker.lng + 0.0005 }}
                options={{
                  disableAutoPan: true,
                  pixelOffset: new window.google.maps.Size(0, -30),
                  maxWidth: 200,
                }}
              >
                <div className="info-window">
                  <strong>{selectedMarker.name}</strong>
                  <br />
                  {selectedMarker.address}
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </div>
        {searchResults.length > 0 && (
          <div className="search-results-container">
            <ul className="results-list">
              {searchResults.map((result, index) => (
                <li key={index} className="result-item" onClick={() => handleResultClick(result.name)}>
                  <div className="result-details">
                    <div className="result-text">
                      <strong>{result.name}</strong>
                      <br />
                      {result.address}
                    </div>
                    {result.rating && (
                      <div className="rating">
                        {Array.from({ length: Math.floor(result.rating) }).map((_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyPlace;
