import React from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Alert variant="danger">
            <h4>Page Not Found</h4>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound; 