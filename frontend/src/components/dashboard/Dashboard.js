import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { 
  BsPeople, 
  BsUpload, 
  BsBuilding, 
  BsPerson
} from 'react-icons/bs';

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const isAdmin = authState.user?.role === 'admin';

  return (
    <Container className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Dashboard</h1>
        {isAdmin && (
          <Button 
            as={Link} 
            to="/guests/add" 
            variant="primary"
            className="rounded-pill"
          >
            + Add Guest
          </Button>
        )}
      </div>
      
      <Row className="gy-4">
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="icon-circle mb-4 bg-blue-light">
                <BsPeople size={24} className="text-primary" />
              </div>
              <Card.Title>Guest Management</Card.Title>
              <Card.Text className="text-muted mb-4">
                View and manage all guests, check-ins, check-outs and payments.
              </Card.Text>
              <div className="mt-auto">
                <Link to="/guests">
                  <Button variant="outline-primary" className="rounded-pill w-100">
                    Guest List
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="icon-circle mb-4 bg-orange-light">
                <BsUpload size={24} className="text-orange" />
              </div>
              <Card.Title>Import Data</Card.Title>
              <Card.Text className="text-muted mb-4">
                Import guest data from CSV files to quickly populate the system.
              </Card.Text>
              <div className="mt-auto">
                <Link to="/import">
                  <Button variant="outline-primary" className="rounded-pill w-100">
                    Import Data
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} md={6} className="mb-4">
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="d-flex flex-column">
              <div className="icon-circle mb-4 bg-green-light">
                <BsBuilding size={24} className="text-success" />
              </div>
              <Card.Title>Accommodations</Card.Title>
              <Card.Text className="text-muted mb-4">
                View and manage accommodation properties in the system.
              </Card.Text>
              <div className="mt-auto">
                <Link to="/accommodations">
                  <Button variant="outline-primary" className="rounded-pill w-100">
                    View Accommodations
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        {isAdmin && (
          <Col lg={4} md={6} className="mb-4">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <div className="icon-circle mb-4 bg-purple-light">
                  <BsPerson size={24} className="text-purple" />
                </div>
                <Card.Title>User Management</Card.Title>
                <Card.Text className="text-muted mb-4">
                  Add, edit or remove system users and their permissions.
                </Card.Text>
                <div className="mt-auto">
                  <Link to="/users">
                    <Button variant="outline-primary" className="rounded-pill w-100">
                      User Management
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard; 