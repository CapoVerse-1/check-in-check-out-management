import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header = () => {
  const { authState, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="py-3" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-2">
            <rect width="24" height="24" rx="12" fill="var(--ios-blue)"/>
            <path d="M7 12H17M17 12L13 8M17 12L13 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>GuestManager</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {authState.isAuthenticated ? (
            <>
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/dashboard" className="mx-2">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/guests" className="mx-2">Guests</Nav.Link>
                <Nav.Link as={Link} to="/import" className="mx-2">Import</Nav.Link>
                <Nav.Link as={Link} to="/accommodations" className="mx-2">Accommodations</Nav.Link>
                {authState.user?.role === 'admin' && (
                  <Nav.Link as={Link} to="/users" className="mx-2">Users</Nav.Link>
                )}
              </Nav>
              <Nav>
                <div className="d-flex align-items-center">
                  {authState.user && (
                    <div className="me-3 d-flex align-items-center">
                      <div className="avatar-circle me-2">
                        {authState.user.firstName?.[0] || ''}{authState.user.lastName?.[0] || ''}
                      </div>
                      <span className="d-none d-md-inline">{authState.user.firstName} {authState.user.lastName}</span>
                    </div>
                  )}
                  <Button 
                    variant="outline-primary" 
                    onClick={handleLogout}
                    className="rounded-pill px-4"
                  >
                    Logout
                  </Button>
                </div>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Button 
                as={Link} 
                to="/login" 
                variant="primary"
                className="rounded-pill px-4"
              >
                Login
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 