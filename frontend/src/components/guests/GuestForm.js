import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsCheckLg, BsKey, BsCreditCard } from 'react-icons/bs';

const GuestForm = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    roomNumber: '',
    roomKey: '',
    deposit: '',
    additionalBookings: '',
    skiPassCategory: '',
    keyReturned: false,
    paymentCompleted: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // TODO: Save guest data
    console.log('Guest data:', formData);
    
    // Redirect to guest list
    navigate('/guests');
  };

  return (
    <Container className="fade-in py-4">
      <div className="d-flex align-items-center mb-4">
        <Button 
          as={Link} 
          to="/guests" 
          variant="light"
          className="rounded-circle p-2 me-3"
        >
          <BsArrowLeft size={20} />
        </Button>
        <h1 className="mb-0">Add New Guest</h1>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Col md={6}>
                <h5 className="mb-3">Personal Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a first name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a last name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <h5 className="mb-3">Room Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Room Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleChange}
                    placeholder="Enter room number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a room number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Room Key</Form.Label>
                  <Form.Control
                    type="text"
                    name="roomKey"
                    value={formData.roomKey}
                    onChange={handleChange}
                    placeholder="Enter room key"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <h5 className="mb-3">Payment Information</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Deposit</Form.Label>
                  <Form.Control
                    type="number"
                    name="deposit"
                    value={formData.deposit}
                    onChange={handleChange}
                    placeholder="Enter deposit amount"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Bookings</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="additionalBookings"
                    value={formData.additionalBookings}
                    onChange={handleChange}
                    placeholder="Enter additional bookings details"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <h5 className="mb-3">Ski Pass</h5>
                <Form.Group className="mb-3">
                  <Form.Label>Ski Pass Category</Form.Label>
                  <Form.Select
                    name="skiPassCategory"
                    value={formData.skiPassCategory}
                    onChange={handleChange}
                  >
                    <option value="">Select ski pass category</option>
                    <option value="1-day">1-Day Pass</option>
                    <option value="3-day">3-Day Pass</option>
                    <option value="weekly">Weekly Pass</option>
                    <option value="season">Season Pass</option>
                  </Form.Select>
                </Form.Group>

                <h5 className="mt-4 mb-3">Status</h5>
                <Card className="border-0 bg-light mb-3">
                  <Card.Body>
                    <Form.Group className="mb-3">
                      <div className="d-flex align-items-center mb-3">
                        <div className="icon-circle bg-blue-light me-3" style={{ width: 40, height: 40 }}>
                          <BsKey className="text-primary" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <Form.Label className="mb-0 fw-medium">Key Returned</Form.Label>
                            <label className="ios-switch">
                              <input
                                type="checkbox"
                                name="keyReturned"
                                checked={formData.keyReturned}
                                onChange={handleChange}
                              />
                              <span className="ios-switch-slider"></span>
                            </label>
                          </div>
                          <small className="text-muted">Toggle when guest returns the room key</small>
                        </div>
                      </div>
                      
                      <div className="d-flex align-items-center">
                        <div className="icon-circle bg-green-light me-3" style={{ width: 40, height: 40 }}>
                          <BsCreditCard className="text-success" />
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex align-items-center justify-content-between">
                            <Form.Label className="mb-0 fw-medium">Payment Completed</Form.Label>
                            <label className="ios-switch">
                              <input
                                type="checkbox"
                                name="paymentCompleted"
                                checked={formData.paymentCompleted}
                                onChange={handleChange}
                              />
                              <span className="ios-switch-slider"></span>
                            </label>
                          </div>
                          <small className="text-muted">Toggle when payment is fully processed</small>
                        </div>
                      </div>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button 
                as={Link} 
                to="/guests" 
                variant="outline-secondary"
                className="rounded-pill px-4"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="primary"
                className="rounded-pill px-4 d-flex align-items-center"
              >
                <BsCheckLg className="me-2" /> Save Guest
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default GuestForm; 