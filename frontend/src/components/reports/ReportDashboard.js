import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import { 
  BsDownload, 
  BsCalendarRange, 
  BsArrowUp, 
  BsArrowDown, 
  BsPersonCheck, 
  BsHouseDoor, 
  BsCurrencyDollar,
  BsKeyFill
} from 'react-icons/bs';

const ReportDashboard = () => {
  const [dateRange, setDateRange] = useState('This Month');
  
  // Placeholder data for stats
  const stats = {
    totalCheckIns: 156,
    checkInsChange: 12.5,
    totalCheckOuts: 142,
    checkOutsChange: 8.3,
    occupancyRate: 78,
    occupancyChange: 5.2,
    totalRevenue: 15840,
    revenueChange: 15.7,
    missingKeys: 3
  };

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Reports & Analytics</h1>
        <div className="d-flex">
          <Dropdown className="me-2">
            <Dropdown.Toggle variant="outline-secondary" className="rounded-pill d-flex align-items-center">
              <BsCalendarRange className="me-2" /> {dateRange}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setDateRange('Today')}>Today</Dropdown.Item>
              <Dropdown.Item onClick={() => setDateRange('This Week')}>This Week</Dropdown.Item>
              <Dropdown.Item onClick={() => setDateRange('This Month')}>This Month</Dropdown.Item>
              <Dropdown.Item onClick={() => setDateRange('Last 3 Months')}>Last 3 Months</Dropdown.Item>
              <Dropdown.Item onClick={() => setDateRange('Year to Date')}>Year to Date</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => setDateRange('Custom Range')}>Custom Range</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button 
            variant="primary"
            className="rounded-pill d-flex align-items-center"
          >
            <BsDownload className="me-2" /> Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-blue-light me-3" style={{ width: 40, height: 40 }}>
                  <BsPersonCheck className="text-primary" />
                </div>
                <h6 className="mb-0">Check-ins</h6>
              </div>
              <h3 className="mb-1">{stats.totalCheckIns}</h3>
              <div className={`d-flex align-items-center ${stats.checkInsChange >= 0 ? 'text-success' : 'text-danger'}`}>
                {stats.checkInsChange >= 0 ? <BsArrowUp size={14} /> : <BsArrowDown size={14} />}
                <span className="ms-1">{Math.abs(stats.checkInsChange)}% vs previous period</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-orange-light me-3" style={{ width: 40, height: 40 }}>
                  <BsPersonCheck className="text-orange" />
                </div>
                <h6 className="mb-0">Check-outs</h6>
              </div>
              <h3 className="mb-1">{stats.totalCheckOuts}</h3>
              <div className={`d-flex align-items-center ${stats.checkOutsChange >= 0 ? 'text-success' : 'text-danger'}`}>
                {stats.checkOutsChange >= 0 ? <BsArrowUp size={14} /> : <BsArrowDown size={14} />}
                <span className="ms-1">{Math.abs(stats.checkOutsChange)}% vs previous period</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-green-light me-3" style={{ width: 40, height: 40 }}>
                  <BsHouseDoor className="text-success" />
                </div>
                <h6 className="mb-0">Occupancy Rate</h6>
              </div>
              <h3 className="mb-1">{stats.occupancyRate}%</h3>
              <div className={`d-flex align-items-center ${stats.occupancyChange >= 0 ? 'text-success' : 'text-danger'}`}>
                {stats.occupancyChange >= 0 ? <BsArrowUp size={14} /> : <BsArrowDown size={14} />}
                <span className="ms-1">{Math.abs(stats.occupancyChange)}% vs previous period</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={3} md={6} className="mb-3">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-purple-light me-3" style={{ width: 40, height: 40 }}>
                  <BsCurrencyDollar className="text-purple" />
                </div>
                <h6 className="mb-0">Revenue</h6>
              </div>
              <h3 className="mb-1">€{stats.totalRevenue.toLocaleString()}</h3>
              <div className={`d-flex align-items-center ${stats.revenueChange >= 0 ? 'text-success' : 'text-danger'}`}>
                {stats.revenueChange >= 0 ? <BsArrowUp size={14} /> : <BsArrowDown size={14} />}
                <span className="ms-1">{Math.abs(stats.revenueChange)}% vs previous period</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Check-ins & Check-outs</h5>
                <Form.Select style={{ width: 'auto' }}>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                </Form.Select>
              </div>
              
              {/* Chart placeholder - in a real app, use a charting library */}
              <div className="chart-placeholder" style={{ height: '250px', background: '#f8f9fa', borderRadius: '8px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#6c757d' }}>
                  Chart visualizing check-ins (blue) and check-outs (orange) over time would appear here
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-4">Room Occupancy</h5>
              
              {/* Donut chart placeholder */}
              <div className="chart-placeholder" style={{ height: '250px', background: '#f8f9fa', borderRadius: '8px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007aff' }}>{stats.occupancyRate}%</div>
                  <div style={{ color: '#6c757d' }}>Occupancy</div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={4} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <h5 className="mb-3">Outstanding Issues</h5>
              
              <div className="d-flex align-items-center p-3 bg-light rounded mb-3">
                <div className="icon-circle bg-red-light me-3" style={{ width: 36, height: 36 }}>
                  <BsKeyFill className="text-danger" />
                </div>
                <div>
                  <h6 className="mb-0">Missing Keys</h6>
                  <p className="mb-0 text-muted">{stats.missingKeys} guests haven't returned keys</p>
                </div>
                <Button variant="outline-danger" size="sm" className="rounded-pill ms-auto">
                  View Details
                </Button>
              </div>
              
              <div className="d-flex align-items-center p-3 bg-light rounded mb-3">
                <div className="icon-circle bg-orange-light me-3" style={{ width: 36, height: 36 }}>
                  <BsCurrencyDollar className="text-orange" />
                </div>
                <div>
                  <h6 className="mb-0">Pending Payments</h6>
                  <p className="mb-0 text-muted">2 guests with outstanding payments</p>
                </div>
                <Button variant="outline-warning" size="sm" className="rounded-pill ms-auto">
                  View Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="mb-0">Popular Accommodations</h5>
                <Button variant="outline-primary" size="sm" className="rounded-pill">
                  View All
                </Button>
              </div>

              {/* Horizontal bar chart placeholder */}
              <div className="chart-placeholder" style={{ height: '200px', background: '#f8f9fa', borderRadius: '8px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#6c757d' }}>
                  Chart showing most popular accommodations would appear here
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportDashboard; 