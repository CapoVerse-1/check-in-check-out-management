import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Badge, Tabs, Tab } from 'react-bootstrap';
import { BsSearch, BsFilter, BsCalendarCheck, BsCalendarX, BsThreeDots, BsArrowRight, BsQuestionCircle } from 'react-icons/bs';

const CheckinRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('checkins');
  
  // Placeholder data for check-ins
  const checkins = [
    { id: 1, guestName: 'John Doe', roomNumber: '101', checkInDate: '2023-09-15', checkInTime: '14:30', status: 'completed', keyIssued: true },
    { id: 2, guestName: 'Jane Smith', roomNumber: '102', checkInDate: '2023-09-15', checkInTime: '15:45', status: 'completed', keyIssued: true },
    { id: 3, guestName: 'Michael Johnson', roomNumber: '103', checkInDate: '2023-09-16', checkInTime: '12:15', status: 'pending', keyIssued: false },
    { id: 4, guestName: 'Sarah Williams', roomNumber: '104', checkInDate: '2023-09-16', checkInTime: '16:30', status: 'pending', keyIssued: false },
  ];

  // Placeholder data for check-outs
  const checkouts = [
    { id: 1, guestName: 'Robert Brown', roomNumber: '201', checkOutDate: '2023-09-14', checkOutTime: '10:30', status: 'completed', keyReturned: true, paymentCompleted: true },
    { id: 2, guestName: 'Emily Davis', roomNumber: '202', checkOutDate: '2023-09-14', checkOutTime: '11:45', status: 'completed', keyReturned: true, paymentCompleted: true },
    { id: 3, guestName: 'David Wilson', roomNumber: '203', checkOutDate: '2023-09-15', checkOutTime: '09:15', status: 'incomplete', keyReturned: false, paymentCompleted: true },
    { id: 4, guestName: 'Lisa Miller', roomNumber: '204', checkOutDate: '2023-09-15', checkOutTime: '10:00', status: 'incomplete', keyReturned: true, paymentCompleted: false },
  ];

  const filteredCheckins = checkins.filter(checkin => 
    checkin.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checkin.roomNumber.includes(searchTerm) ||
    checkin.checkInDate.includes(searchTerm)
  );

  const filteredCheckouts = checkouts.filter(checkout => 
    checkout.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    checkout.roomNumber.includes(searchTerm) ||
    checkout.checkOutDate.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge bg="success" className="rounded-pill px-3 py-2">Completed</Badge>;
      case 'pending':
        return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">Pending</Badge>;
      case 'incomplete':
        return <Badge bg="danger" className="rounded-pill px-3 py-2">Incomplete</Badge>;
      default:
        return <Badge bg="secondary" className="rounded-pill px-3 py-2">{status}</Badge>;
    }
  };

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Check-in/Check-out Records</h1>
        <div className="d-flex">
          <Button 
            variant="outline-primary"
            className="rounded-pill me-2 d-flex align-items-center"
          >
            <BsCalendarCheck className="me-2" /> New Check-in
          </Button>
          <Button 
            variant="primary"
            className="rounded-pill d-flex align-items-center"
          >
            <BsCalendarX className="me-2" /> New Check-out
          </Button>
        </div>
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
                  placeholder="Search by guest name, room number or date"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
            </Col>
            <Col lg={4} className="d-flex justify-content-lg-end">
              <Button variant="outline-secondary" className="rounded-pill d-flex align-items-center me-2">
                <BsFilter className="me-2" /> Filter
              </Button>
              <Form.Select className="w-auto">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Current month</option>
                <option>Custom range</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3 px-4 pt-3"
          >
            <Tab eventKey="checkins" title="Check-ins">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Guest Name</th>
                      <th>Room</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Key Issued</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCheckins.map(checkin => (
                      <tr key={checkin.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle me-3 bg-blue-light">
                              {checkin.guestName.split(' ').map(name => name[0]).join('')}
                            </div>
                            <div className="fw-semibold">{checkin.guestName}</div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="light" text="dark" className="rounded-pill px-3 py-2">
                            Room {checkin.roomNumber}
                          </Badge>
                        </td>
                        <td>
                          {checkin.checkInDate} <span className="text-muted">at</span> {checkin.checkInTime}
                        </td>
                        <td>
                          {getStatusBadge(checkin.status)}
                        </td>
                        <td>
                          {checkin.keyIssued ? (
                            <Badge bg="success" className="rounded-pill px-3 py-2">Issued</Badge>
                          ) : (
                            <Badge bg="secondary" className="rounded-pill px-3 py-2">Pending</Badge>
                          )}
                        </td>
                        <td>
                          <Button variant="light" size="sm" className="rounded-circle p-2">
                            <BsThreeDots />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="checkouts" title="Check-outs">
              <div className="table-responsive">
                <Table hover className="mb-0">
                  <thead>
                    <tr>
                      <th>Guest Name</th>
                      <th>Room</th>
                      <th>Date & Time</th>
                      <th>Status</th>
                      <th>Key Returned</th>
                      <th>Payment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCheckouts.map(checkout => (
                      <tr key={checkout.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-circle me-3 bg-blue-light">
                              {checkout.guestName.split(' ').map(name => name[0]).join('')}
                            </div>
                            <div className="fw-semibold">{checkout.guestName}</div>
                          </div>
                        </td>
                        <td>
                          <Badge bg="light" text="dark" className="rounded-pill px-3 py-2">
                            Room {checkout.roomNumber}
                          </Badge>
                        </td>
                        <td>
                          {checkout.checkOutDate} <span className="text-muted">at</span> {checkout.checkOutTime}
                        </td>
                        <td>
                          {getStatusBadge(checkout.status)}
                        </td>
                        <td>
                          {checkout.keyReturned ? (
                            <Badge bg="success" className="rounded-pill px-3 py-2">Returned</Badge>
                          ) : (
                            <Badge bg="danger" className="rounded-pill px-3 py-2">Missing</Badge>
                          )}
                        </td>
                        <td>
                          {checkout.paymentCompleted ? (
                            <Badge bg="success" className="rounded-pill px-3 py-2">Completed</Badge>
                          ) : (
                            <Badge bg="danger" className="rounded-pill px-3 py-2">Pending</Badge>
                          )}
                        </td>
                        <td>
                          <Button variant="light" size="sm" className="rounded-circle p-2">
                            <BsThreeDots />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm mt-4 bg-light">
        <Card.Body className="p-4">
          <div className="d-flex">
            <div className="me-3">
              <BsQuestionCircle size={24} className="text-primary mt-1" />
            </div>
            <div>
              <h5>Quick Guide</h5>
              <p className="mb-0">
                <strong>Check-in process:</strong> Verify guest identity <BsArrowRight className="mx-2" /> 
                Issue room key <BsArrowRight className="mx-2" /> Collect deposit <BsArrowRight className="mx-2" /> 
                Provide welcome information
              </p>
              <p className="mb-0">
                <strong>Check-out process:</strong> Verify room status <BsArrowRight className="mx-2" /> 
                Collect room key <BsArrowRight className="mx-2" /> Process final payment <BsArrowRight className="mx-2" /> 
                Update records
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckinRecords; 