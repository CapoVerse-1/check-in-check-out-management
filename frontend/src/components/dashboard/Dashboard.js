import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.user?.role === 'admin';

  return (
    <Container>
      <h1 className="my-4">Dashboard</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header>Guest Management</Card.Header>
            <Card.Body>
              <Card.Title>Manage Guests</Card.Title>
              <Card.Text>
                View and manage all guests, check-ins, check-outs and payments.
              </Card.Text>
              <Link to="/guests">
                <Button variant="primary">Guest List</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header>Import Data</Card.Header>
            <Card.Body>
              <Card.Title>Import CSV Files</Card.Title>
              <Card.Text>
                Import guest data from CSV files to quickly populate the system.
              </Card.Text>
              <Link to="/import">
                <Button variant="primary">Import Data</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header>Accommodations</Card.Header>
            <Card.Body>
              <Card.Title>Manage Accommodations</Card.Title>
              <Card.Text>
                View and manage accommodation properties in the system.
              </Card.Text>
              <Link to="/accommodations">
                <Button variant="primary">View Accommodations</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        
        {isAdmin && (
          <Col md={4} className="mb-4">
            <Card>
              <Card.Header>User Management</Card.Header>
              <Card.Body>
                <Card.Title>Manage Users</Card.Title>
                <Card.Text>
                  Add, edit or remove system users and their permissions.
                </Card.Text>
                <Link to="/users">
                  <Button variant="primary">User Management</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard; 