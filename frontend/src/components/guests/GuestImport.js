import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ProgressBar, Table, Badge } from 'react-bootstrap';
import { BsUpload, BsPeople, BsCheckCircle, BsExclamationTriangle, BsInfoCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const GuestImport = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [template, setTemplate] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImportSuccess(false);
    
    // Generate sample preview data
    if (selectedFile) {
      const mockPreview = [
        { firstName: 'John', lastName: 'Doe', roomNumber: '101', skiPass: '1-day', deposit: '100', keyReturned: false },
        { firstName: 'Jane', lastName: 'Smith', roomNumber: '102', skiPass: '3-day', deposit: '150', keyReturned: false },
        { firstName: 'Michael', lastName: 'Johnson', roomNumber: '103', skiPass: 'weekly', deposit: '200', keyReturned: false },
      ];
      setPreview(mockPreview);
    } else {
      setPreview(null);
    }
  };

  const handleImport = () => {
    if (!file) return;
    
    setImporting(true);
    setProgress(0);
    
    // Simulate import process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setImporting(false);
            setImportSuccess(true);
          }, 500);
        }
        return newProgress;
      });
    }, 200);
  };

  const downloadTemplate = () => {
    setTemplate(true);
    setTimeout(() => setTemplate(false), 3000);
    // In a real app, this would trigger a file download
  };

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Import Guests</h1>
        <Button 
          as={Link}
          to="/guests"
          variant="outline-secondary"
          className="rounded-pill"
        >
          Back to Guests
        </Button>
      </div>

      <Row>
        <Col lg={5} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-circle bg-blue-light me-3">
                  <BsPeople className="text-primary" />
                </div>
                <h5 className="mb-0">Upload Guest Data</h5>
              </div>

              {!file && !importSuccess && (
                <div className="upload-zone p-4 text-center bg-light rounded mb-3">
                  <BsUpload size={36} className="text-muted mb-3" />
                  <p className="mb-3">Drop your Excel or CSV file here</p>
                  <Form.Group controlId="guestFile" className="mb-3">
                    <Form.Control 
                      type="file" 
                      accept=".csv,.xlsx,.xls" 
                      onChange={handleFileChange} 
                      className="d-none" 
                    />
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill px-4"
                      onClick={() => document.getElementById('guestFile').click()}
                    >
                      Select File
                    </Button>
                  </Form.Group>
                </div>
              )}

              {file && (
                <div className="bg-light p-3 rounded mb-4">
                  <div className="d-flex align-items-center">
                    <BsPeople className="text-primary me-2" />
                    <span className="fw-medium">{file.name}</span>
                    <small className="text-muted ms-2">({(file.size / 1024).toFixed(2)} KB)</small>
                  </div>
                </div>
              )}

              {importing && (
                <div className="mb-4">
                  <p className="mb-2">Importing guests...</p>
                  <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />
                </div>
              )}

              {importSuccess && (
                <Alert variant="success" className="d-flex mb-4">
                  <BsCheckCircle className="me-2 mt-1" />
                  <div>
                    <p className="mb-0 fw-medium">Import Successful!</p>
                    <p className="mb-0">Added {preview?.length || 0} new guests.</p>
                  </div>
                </Alert>
              )}

              {template && (
                <Alert variant="info" className="d-flex mb-4">
                  <BsInfoCircle className="me-2 mt-1" />
                  <div>
                    <p className="mb-0 fw-medium">Template Downloaded</p>
                    <p className="mb-0">Fill in the template and upload it to import guests.</p>
                  </div>
                </Alert>
              )}

              <div className="mt-4">
                <Form.Check 
                  type="checkbox"
                  id="assign-rooms"
                  label="Auto-assign rooms to new guests"
                  className="mb-2"
                />
                
                <Form.Check 
                  type="checkbox"
                  id="update-existing-guests"
                  label="Update existing guests"
                  className="mb-2"
                />
                
                <div className="d-grid gap-2 mt-3">
                  {file && !importing && !importSuccess && (
                    <Button 
                      variant="primary" 
                      className="rounded-pill"
                      onClick={handleImport}
                    >
                      Import Guests
                    </Button>
                  )}
                  
                  {importSuccess && (
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill"
                      onClick={() => {
                        setFile(null);
                        setPreview(null);
                        setImportSuccess(false);
                      }}
                    >
                      Import Another File
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline-secondary" 
                    className="rounded-pill"
                    onClick={downloadTemplate}
                  >
                    Download Template
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h5 className="mb-3">Required Fields</h5>
              <div className="mb-1">
                <Badge bg="primary" className="me-2 mb-2">First Name</Badge>
                <Badge bg="primary" className="me-2 mb-2">Last Name</Badge>
                <Badge bg="primary" className="me-2 mb-2">Room Number</Badge>
              </div>
              <div>
                <Badge bg="light" text="dark" className="me-2 mb-2">Ski Pass</Badge>
                <Badge bg="light" text="dark" className="me-2 mb-2">Deposit</Badge>
                <Badge bg="light" text="dark" className="me-2 mb-2">Check-in Date</Badge>
                <Badge bg="light" text="dark" className="me-2 mb-2">Check-out Date</Badge>
              </div>
              <small className="text-muted d-block mt-2">
                <BsInfoCircle className="me-1" />
                Blue badges are required fields, grey badges are optional
              </small>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3">Data Preview</h5>

              {preview ? (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Room</th>
                        <th>Ski Pass</th>
                        <th>Deposit</th>
                        <th>Key Returned</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((guest, index) => (
                        <tr key={index}>
                          <td>{guest.firstName}</td>
                          <td>{guest.lastName}</td>
                          <td>{guest.roomNumber}</td>
                          <td>{guest.skiPass}</td>
                          <td>€{guest.deposit}</td>
                          <td>
                            <Badge bg={guest.keyReturned ? "success" : "secondary"}>
                              {guest.keyReturned ? "Yes" : "No"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <BsPeople size={36} className="mb-3" />
                  <p>Upload a file to see a preview</p>
                </div>
              )}
            </Card.Body>
          </Card>

          {file && (
            <Card className="border-0 shadow-sm mt-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-start mb-3">
                  <BsExclamationTriangle className="text-warning me-2 mt-1" />
                  <div>
                    <h5 className="mb-2">Import Notes</h5>
                    <ul className="ps-3 mb-0">
                      <li>All guests will be set as new check-ins</li>
                      <li>Room keys will be auto-generated for each guest</li>
                      <li>Duplicate entries based on full name and room number will be skipped</li>
                      <li>You can edit guest information after import from the guest details page</li>
                    </ul>
                  </div>
                </div>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GuestImport; 