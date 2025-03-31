import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import Header from './components/layout/Header';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import GuestList from './components/guests/GuestList';
import GuestDetail from './components/guests/GuestDetail';
import GuestForm from './components/guests/GuestForm';
import ImportCSV from './components/imports/ImportCSV';
import AccommodationList from './components/accommodations/AccommodationList';
import AccommodationDetail from './components/accommodations/AccommodationDetail';
import AccommodationForm from './components/accommodations/AccommodationForm';
import UserList from './components/users/UserList';
import UserForm from './components/users/UserForm';
import NotFound from './components/layout/NotFound';

// Context
import AuthContext from './context/AuthContext';

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('token')
  });

  // Check if token exists and validate it
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:5000/api/users/me', {
            headers: {
              'x-auth-token': token
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            setAuthState({
              isAuthenticated: true,
              user: userData,
              token
            });
          } else {
            // Token invalid
            localStorage.removeItem('token');
            setAuthState({
              isAuthenticated: false,
              user: null,
              token: null
            });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
          setAuthState({
            isAuthenticated: false,
            user: null,
            token: null
          });
        }
      }
    };
    
    checkAuth();
  }, []);

  // Login function
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    setAuthState({
      isAuthenticated: true,
      user: userData,
      token
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null
    });
  };

  // Protected route component
  const ProtectedRoute = ({ element, adminOnly = false }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (adminOnly && authState.user?.role !== 'admin') {
      return <Navigate to="/dashboard" />;
    }

    return element;
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      <Router>
        <Header />
        <Container className="mt-4 mb-5">
          <Routes>
            <Route path="/login" element={
              authState.isAuthenticated ? 
                <Navigate to="/dashboard" /> : 
                <Login />
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute element={<Dashboard />} />
            } />
            
            <Route path="/guests" element={
              <ProtectedRoute element={<GuestList />} />
            } />
            
            <Route path="/guests/:id" element={
              <ProtectedRoute element={<GuestDetail />} />
            } />
            
            <Route path="/guests/add" element={
              <ProtectedRoute element={<GuestForm />} />
            } />
            
            <Route path="/guests/edit/:id" element={
              <ProtectedRoute element={<GuestForm />} />
            } />
            
            <Route path="/import" element={
              <ProtectedRoute element={<ImportCSV />} />
            } />
            
            <Route path="/accommodations" element={
              <ProtectedRoute element={<AccommodationList />} />
            } />
            
            <Route path="/accommodations/:id" element={
              <ProtectedRoute element={<AccommodationDetail />} />
            } />
            
            <Route path="/accommodations/add" element={
              <ProtectedRoute element={<AccommodationForm />} adminOnly={true} />
            } />
            
            <Route path="/accommodations/edit/:id" element={
              <ProtectedRoute element={<AccommodationForm />} adminOnly={true} />
            } />
            
            <Route path="/users" element={
              <ProtectedRoute element={<UserList />} adminOnly={true} />
            } />
            
            <Route path="/users/add" element={
              <ProtectedRoute element={<UserForm />} adminOnly={true} />
            } />
            
            <Route path="/users/edit/:id" element={
              <ProtectedRoute element={<UserForm />} adminOnly={true} />
            } />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </Router>
    </AuthContext.Provider>
  );
}

export default App; 