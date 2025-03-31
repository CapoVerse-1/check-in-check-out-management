import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Alert, ProgressBar } from 'react-bootstrap';
import { BsUpload, BsTable, BsFileEarmarkCheck, BsX } from 'react-icons/bs';

const ImportCSV = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImportSuccess(false);
    setErrorMessage('');
    
    // Generate preview for demo purposes
    if (selectedFile) {
      const mockPreview = [
        { firstName: 'John', lastName: 'Doe', roomNumber: '101', roomKey: 'A-101', deposit: '100', skiPassCategory: '1-day' },
        { firstName: 'Jane', lastName: 'Smith', roomNumber: '102', roomKey: 'A-102', deposit: '150', skiPassCategory: '3-day' },
        { firstName: 'Michael', lastName: 'Johnson', roomNumber: '103', roomKey: 'A-103', deposit: '200', skiPassCategory: 'weekly' },
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
    
    // Simulate import process with progress
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

  const resetImport = () => {
    setFile(null);
    setPreview(null);
    setImporting(false);
    setImportSuccess(false);
    setErrorMessage('');
    setProgress(0);
  };

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Import Guest Data</h1>
      </div>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <h5 className="mb-3">Upload CSV File</h5>
              
              {!file && !importSuccess && (
                <div className="upload-zone p-5 text-center bg-light rounded mb-3">
                  <BsUpload size={48} className="text-muted mb-3" />
                  <p className="mb-4">Drag & drop your CSV file here or click to browse</p>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control 
                      type="file" 
                      accept=".csv" 
                      onChange={handleFileChange} 
                      className="d-none" 
                    />
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill px-4"
                      onClick={() => document.getElementById('formFile').click()}
                    >
                      Select File
                    </Button>
                  </Form.Group>
                </div>
              )}
              
              {file && !importSuccess && (
                <div className="selected-file p-3 bg-light rounded mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="icon-circle bg-blue-light me-3" style={{ width: 40, height: 40 }}>
                        <BsTable className="text-primary" />
                      </div>
                      <div>
                        <p className="mb-0 fw-medium">{file.name}</p>
                        <small className="text-muted">{(file.size / 1024).toFixed(2)} KB</small>
                      </div>
                    </div>
                    <Button 
                      variant="light" 
                      className="rounded-circle p-1" 
                      onClick={resetImport}
                    >
                      <BsX size={20} />
                    </Button>
                  </div>
                </div>
              )}
              
              {importing && (
                <div className="mb-4">
                  <p className="mb-2">Importing {preview?.length || 0} records...</p>
                  <ProgressBar 
                    now={progress} 
                    label={`${progress}%`} 
                    className="mb-3" 
                    variant="primary"
                  />
                </div>
              )}
              
              {importSuccess && (
                <Alert variant="success" className="d-flex align-items-center mb-4">
                  <BsFileEarmarkCheck className="me-2" size={24} />
                  <div>
                    <p className="mb-0 fw-medium">Import Successful!</p>
                    <small>Successfully imported {preview?.length || 0} guest records.</small>
                  </div>
                </Alert>
              )}
              
              {errorMessage && (
                <Alert variant="danger" className="mb-4">
                  {errorMessage}
                </Alert>
              )}
              
              <div className="d-flex justify-content-between">
                <div>
                  <Form.Check 
                    type="checkbox" 
                    id="update-existing"
                    label="Update existing guests" 
                    className="mb-2"
                  />
                  <Form.Check 
                    type="checkbox" 
                    id="skip-errors"
                    label="Skip records with errors" 
                  />
                </div>
                
                <div>
                  {file && !importing && !importSuccess && (
                    <Button 
                      variant="primary" 
                      className="rounded-pill px-4"
                      onClick={handleImport}
                    >
                      Import Now
                    </Button>
                  )}
                  
                  {importSuccess && (
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill px-4"
                      onClick={resetImport}
                    >
                      Import Another File
                    </Button>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <h5 className="mb-3">Preview</h5>
              
              {preview ? (
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Room</th>
                        <th>Room Key</th>
                        <th>Deposit</th>
                        <th>Ski Pass</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, index) => (
                        <tr key={index}>
                          <td>{row.firstName}</td>
                          <td>{row.lastName}</td>
                          <td>{row.roomNumber}</td>
                          <td>{row.roomKey}</td>
                          <td>€{row.deposit}</td>
                          <td>{row.skiPassCategory}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <BsTable size={48} className="mb-3" />
                  <p>Upload a CSV file to see a preview</p>
                </div>
              )}
            </Card.Body>
          </Card>
          
          {file && (
            <Card className="border-0 shadow-sm mt-4">
              <Card.Body className="p-4">
                <h5 className="mb-3">Column Mapping</h5>
                <p className="text-muted mb-3">Map CSV columns to guest fields</p>
                
                <Row className="mb-2">
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Select defaultValue="firstName">
                        <option>First Name</option>
                        <option>FirstName</option>
                        <option>Vorname</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Select defaultValue="lastName">
                        <option>Last Name</option>
                        <option>LastName</option>
                        <option>Name</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Room Number</Form.Label>
                      <Form.Select defaultValue="roomNumber">
                        <option>Room Number</option>
                        <option>RoomNumber</option>
                        <option>Zimmernummer</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Ski Pass Category</Form.Label>
                      <Form.Select defaultValue="skiPassCategory">
                        <option>Ski Pass Category</option>
                        <option>SkiPassCategory</option>
                        <option>Skipass</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ImportCSV; 