import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Table, Badge, Modal } from 'react-bootstrap';
import { BsSearch, BsFilter, BsPlusCircle, BsPersonCircle, BsPencil, BsTrash, BsKey } from 'react-icons/bs';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'staff'
  });
  
  // Placeholder data for users
  const users = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', role: 'admin', lastLogin: '2023-09-15 10:30 AM', status: 'active' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', role: 'staff', lastLogin: '2023-09-14 02:45 PM', status: 'active' },
    { id: 3, firstName: 'Michael', lastName: 'Johnson', email: 'michael.j@example.com', role: 'staff', lastLogin: '2023-09-12 09:15 AM', status: 'active' },
    { id: 4, firstName: 'Sarah', lastName: 'Williams', email: 'sarah.w@example.com', role: 'staff', lastLogin: '2023-09-10 11:20 AM', status: 'inactive' },
  ];

  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    // In a real app, this would send data to the backend
    console.log('Adding new user:', userForm);
    setShowAddModal(false);
    // Reset form
    setUserForm({
      firstName: '',
      lastName: '',
      email: '',
      role: 'staff'
    });
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'admin':
        return 'primary';
      case 'staff':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">User Management</h1>
        <Button 
          variant="primary"
          className="rounded-pill d-flex align-items-center"
          onClick={() => setShowAddModal(true)}
        >
          <BsPlusCircle className="me-2" /> Add User
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
                  placeholder="Search by name, email or role"
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
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last Login</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar-circle me-3 bg-blue-light">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div>
                      <div className="fw-semibold">{user.firstName} {user.lastName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <Badge 
                    bg={getRoleBadgeVariant(user.role)} 
                    className="rounded-pill px-3 py-2"
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                </td>
                <td>{user.lastLogin}</td>
                <td>
                  <Badge 
                    bg={user.status === 'active' ? 'success' : 'secondary'} 
                    className="rounded-pill px-3 py-2"
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex">
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle p-2 me-2"
                    >
                      <BsPencil />
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle p-2 me-2"
                    >
                      <BsKey />
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="rounded-circle p-2"
                    >
                      <BsTrash className="text-danger" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="firstName"
                    value={userForm.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name" 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="lastName"
                    value={userForm.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name" 
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={userForm.email}
                onChange={handleInputChange}
                placeholder="Enter email address" 
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={userForm.role}
                onChange={handleInputChange}
              >
                <option value="staff">Staff</option>
                <option value="admin">Administrator</option>
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Initial Password</Form.Label>
              <Form.Control type="password" placeholder="Enter temporary password" />
              <Form.Text className="text-muted">
                User will be prompted to change password on first login.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserList; 