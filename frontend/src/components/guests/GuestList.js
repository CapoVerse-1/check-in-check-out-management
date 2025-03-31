import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsSearch, BsFilter, BsPlusCircle, BsCheckCircleFill, BsXCircle } from 'react-icons/bs';

const GuestList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Placeholder data
  const guests = [
    { id: 1, firstName: 'John', lastName: 'Doe', roomNumber: '101', keyReturned: true, paymentCompleted: true, checkedOut: false },
    { id: 2, firstName: 'Jane', lastName: 'Smith', roomNumber: '102', keyReturned: false, paymentCompleted: true, checkedOut: false },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', roomNumber: '103', keyReturned: true, paymentCompleted: false, checkedOut: false },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', roomNumber: '104', keyReturned: true, paymentCompleted: true, checkedOut: true },
  ];

  const filteredGuests = guests.filter(guest => 
    guest.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.roomNumber.includes(searchTerm)
  );

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Guests</h1>
        <Button 
          as={Link} 
          to="/guests/add" 
          variant="primary"
          className="rounded-pill d-flex align-items-center"
        >
          <BsPlusCircle className="me-2" /> Add Guest
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
                  placeholder="Search by name or room number"
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

      <Card className="border-0 shadow-sm">
        <Table responsive hover className="mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGuests.map(guest => (
              <tr key={guest.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-circle me-3 bg-blue-light">
                      {guest.firstName[0]}{guest.lastName[0]}
                    </div>
                    <div>
                      <div className="fw-semibold">{guest.firstName} {guest.lastName}</div>
                      <small className="text-muted">Guest #{guest.id}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge bg="light" text="dark" className="rounded-pill px-3 py-2">
                    Room {guest.roomNumber}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex flex-column">
                    <div className={`d-flex align-items-center mb-1 ${guest.keyReturned ? 'text-success' : 'text-muted'}`}>
                      {guest.keyReturned ? <BsCheckCircleFill className="me-2" /> : <BsXCircle className="me-2" />}
                      Key
                    </div>
                    <div className={`d-flex align-items-center ${guest.paymentCompleted ? 'text-success' : 'text-muted'}`}>
                      {guest.paymentCompleted ? <BsCheckCircleFill className="me-2" /> : <BsXCircle className="me-2" />}
                      Payment
                    </div>
                  </div>
                </td>
                <td>
                  <Button
                    as={Link}
                    to={`/guests/${guest.id}`}
                    variant="outline-primary"
                    size="sm"
                    className="rounded-pill me-2"
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`/guests/edit/${guest.id}`}
                    variant="outline-secondary"
                    size="sm"
                    className="rounded-pill"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default GuestList; 