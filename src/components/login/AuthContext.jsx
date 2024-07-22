/**
 * 사용자 인증 상태를 관리
 */
 import React, { createContext, useState, useEffect } from 'react';

 export const AuthContext = createContext();
 
 export const AuthProvider = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
 
   useEffect(() => {
     const token = localStorage.getItem('token');
     if (token) {
       setIsAuthenticated(true);
     }
   }, []);
 
   const login = () => {
     setIsAuthenticated(true);
   };
 
   const logout = () => {
     setIsAuthenticated(false);
     localStorage.removeItem('token');
   };
 
   return (
     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
       {children}
     </AuthContext.Provider>
   );
 };
 