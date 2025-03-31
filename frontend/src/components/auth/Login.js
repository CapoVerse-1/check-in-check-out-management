import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useContext(AuthContext);
  
  const { username, password } = formData;
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // In a real app, you would make an API call here
      // This is just a placeholder for demo purposes
      setTimeout(() => {
        login({ 
          id: '1', 
          username, 
          firstName: 'Demo', 
          lastName: 'User', 
          role: 'admin' 
        }, 'demo-token');
        setLoading(false);
      }, 1000);
      
      // Real implementation would be:
      /*
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      login(data.user, data.token);
      */
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
    }
  };
  
  return (
    <Container className="fade-in">
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={5} xl={4}>
          <div className="text-center mb-5">
            <div className="app-icon mx-auto mb-4">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="48" height="48" rx="12" fill="var(--ios-blue)"/>
                <path d="M14 24H34M34 24L26 16M34 24L26 32" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="mb-1">GuestManager</h1>
            <p className="text-muted">Sign in to your account</p>
          </div>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger" className="mb-4">
                  {error}
                </Alert>
              )}
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your username"
                    name="username"
                    value={username}
                    onChange={onChange}
                    required
                    className="py-3"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required
                    className="py-3"
                  />
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 py-3 rounded-pill mb-3"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-muted small">
                    Login with username: "admin" and any password to demo the application
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login; 