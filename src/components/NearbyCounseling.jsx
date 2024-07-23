import React, { useState, useEffect } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import './style/NearbyCounseling.css';

const NearbyCounseling = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.5665, lng: 126.9780 });
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = () => {
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
          setMarkers(places.map((place) => ({ lat: place.lat, lng: place.lng })));
        } else {
          console.error('Search failed: ', status);
        }
      });
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className={`nearby-counseling ${searchResults.length ? 'with-results' : ''}`}>
      <h2>키워드로 장소 찾기</h2>
      <div className="search-container">
        <input
          type="text"
          value={keyword}
          onChange={handleKeywordChange}
          placeholder="키워드를 입력하세요"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
      <div className="content-container">
        <div className="map-container">
          <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={['places']}>
            <GoogleMap
              center={currentLocation}
              zoom={14}
              onLoad={(map) => setMap(map)}
              mapContainerStyle={{ width: '100%', height: '100%' }}
            >
              <Marker position={currentLocation} title="현재 위치" />
              {markers.map((marker, index) => (
                <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
              ))}
            </GoogleMap>
          </LoadScript>
        </div>
        {searchResults.length > 0 && (
          <ul className="results-list">
            {searchResults.map((result, index) => (
              <li key={index} className="result-item">
                <strong>{result.name}</strong>
                <br />
                {result.address}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NearbyCounseling;
