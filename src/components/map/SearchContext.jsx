// SearchContext.js
import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 37.5665, lng: 126.9780 });
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [markers, setMarkers] = useState([]);

  return (
    <SearchContext.Provider value={{ currentLocation, setCurrentLocation, keyword, setKeyword, searchResults, setSearchResults, markers, setMarkers }}>
      {children}
    </SearchContext.Provider>
  );
};
