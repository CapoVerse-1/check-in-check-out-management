import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Badge } from 'react-bootstrap';
import { BsSearch, BsFilter, BsPlusCircle, BsHouseDoor, BsBoxArrowUpRight, BsPencil } from 'react-icons/bs';

const AccommodationList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Placeholder data for accommodations
  const accommodations = [
    { id: 1, name: 'Alpine Lodge', type: 'Hotel', address: 'Mountain Road 14', rooms: 24, vacant: 8, occupied: 16 },
    { id: 2, name: 'Snowy Heights', type: 'Chalet', address: 'Peak View 22', rooms: 8, vacant: 3, occupied: 5 },
    { id: 3, name: 'Pine Apartments', type: 'Apartment', address: 'Forest Lane 5', rooms: 12, vacant: 5, occupied: 7 },
    { id: 4, name: 'Village Inn', type: 'Hotel', address: 'Main Street 37', rooms: 35, vacant: 15, occupied: 20 },
  ];

  const filteredAccommodations = accommodations.filter(accommodation => 
    accommodation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accommodation.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    accommodation.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Accommodations</h1>
        <Button 
          variant="primary"
          className="rounded-pill d-flex align-items-center"
        >
          <BsPlusCircle className="me-2" /> Add Accommodation
        </Button>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col lg={8}>
              <InputGroup>
                <InputGroup.Text className="bg-transparent border-end-0">
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by name, type or address"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
            </Col>
            <Col lg={4} className="d-flex justify-content-lg-end">
              <Button variant="outline-secondary" className="rounded-pill d-flex align-items-center">
                <BsFilter className="me-2" /> Filter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row>
        {filteredAccommodations.map(accommodation => (
          <Col lg={6} className="mb-4" key={accommodation.id}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <div className="d-flex mb-3">
                  <div className="icon-circle bg-blue-light me-3">
                    <BsHouseDoor size={24} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="mb-1">{accommodation.name}</h5>
                    <Badge bg="light" text="dark" className="rounded-pill">
                      {accommodation.type}
                    </Badge>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-muted mb-2">{accommodation.address}</p>
                  <div className="d-flex mb-3">
                    <div className="me-4">
                      <span className="d-block fw-semibold">{accommodation.rooms}</span>
                      <small className="text-muted">Rooms</small>
                    </div>
                    <div className="me-4">
                      <span className="d-block fw-semibold text-success">{accommodation.vacant}</span>
                      <small className="text-muted">Vacant</small>
                    </div>
                    <div>
                      <span className="d-block fw-semibold text-primary">{accommodation.occupied}</span>
                      <small className="text-muted">Occupied</small>
                    </div>
                  </div>
                </div>

                <div className="progress mb-4" style={{ height: '6px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${(accommodation.occupied / accommodation.rooms) * 100}%` }}
                    aria-valuenow={(accommodation.occupied / accommodation.rooms) * 100}
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="d-flex">
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    className="rounded-pill me-2 d-flex align-items-center"
                  >
                    <BsBoxArrowUpRight className="me-1" /> View Details
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="rounded-pill d-flex align-items-center"
                  >
                    <BsPencil className="me-1" /> Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AccommodationList; 