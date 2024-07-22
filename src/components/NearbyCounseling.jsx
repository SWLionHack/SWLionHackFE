import React, { useState, useEffect } from 'react';
// import './NearbyCounseling.css';

const counselingCenters = [
  { id: 1, name: '상담소 A', lat: 37.5665, lng: 126.9780 },
  { id: 2, name: '상담소 B', lat: 37.5651, lng: 126.9895 },
  { id: 3, name: '상담소 C', lat: 37.5644, lng: 126.9778 },
];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (킬로미터)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    0.5 - Math.cos(dLat) / 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    (1 - Math.cos(dLon)) / 2;

  return R * 2 * Math.asin(Math.sqrt(a));
}

function NearbyCounseling() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [nearbyCenters, setNearbyCenters] = useState([]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    if (location.lat && location.lng) {
      const centersWithDistance = counselingCenters.map(center => {
        const distance = getDistance(location.lat, location.lng, center.lat, center.lng);
        return { ...center, distance };
      });

      centersWithDistance.sort((a, b) => a.distance - b.distance);
      setNearbyCenters(centersWithDistance);
    }
  }, [location]);

  useEffect(() => {
    if (location.lat && location.lng) {
      const script = document.createElement('script');
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_API_CLIENT_SECRET}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        const map = new window.naver.maps.Map('map', {
          center: new window.naver.maps.LatLng(location.lat, location.lng),
          zoom: 14
        });

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(location.lat, location.lng),
          map: map,
          title: '현재 위치'
        });

        nearbyCenters.forEach(center => {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(center.lat, center.lng),
            map: map,
            title: center.name
          });
        });
      };
    }
  }, [location, nearbyCenters]);

  return (
    <div className="nearby-counseling">
      <h2>가까운 상담소 찾기</h2>
      {location.lat && location.lng ? (
        <>
          <div id="map" style={{ width: '100%', height: '400px' }}></div>
          <ul>
            {nearbyCenters.map(center => (
              <li key={center.id}>
                {center.name} - {center.distance.toFixed(2)} km
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>위치 정보를 불러오는 중...</p>
      )}
    </div>
  );
}

export default NearbyCounseling;
