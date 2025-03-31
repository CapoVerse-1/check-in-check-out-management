import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, ProgressBar, Table } from 'react-bootstrap';
import { BsUpload, BsBuilding, BsCheckCircle, BsExclamationTriangle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const AccommodationImport = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImportSuccess(false);
    
    // Generate sample preview data
    if (selectedFile) {
      const mockPreview = [
        { name: 'Alpine Lodge', type: 'Hotel', address: 'Mountain Road 14', rooms: 24 },
        { name: 'Snowy Heights', type: 'Chalet', address: 'Peak View 22', rooms: 8 },
        { name: 'Pine Apartments', type: 'Apartment', address: 'Forest Lane 5', rooms: 12 },
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

  return (
    <Container className="fade-in py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Import Accommodations</h1>
        <Button 
          as={Link}
          to="/accommodations"
          variant="outline-secondary"
          className="rounded-pill"
        >
          Back to Accommodations
        </Button>
      </div>

      <Row>
        <Col lg={5} className="mb-4">
          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-circle bg-blue-light me-3">
                  <BsBuilding className="text-primary" />
                </div>
                <h5 className="mb-0">Upload Accommodation Data</h5>
              </div>

              {!file && !importSuccess && (
                <div className="upload-zone p-4 text-center bg-light rounded mb-3">
                  <BsUpload size={36} className="text-muted mb-3" />
                  <p className="mb-3">Drop your Excel or CSV file here</p>
                  <Form.Group controlId="accommodationFile" className="mb-3">
                    <Form.Control 
                      type="file" 
                      accept=".csv,.xlsx,.xls" 
                      onChange={handleFileChange} 
                      className="d-none" 
                    />
                    <Button 
                      variant="outline-primary" 
                      className="rounded-pill px-4"
                      onClick={() => document.getElementById('accommodationFile').click()}
                    >
                      Select File
                    </Button>
                  </Form.Group>
                </div>
              )}

              {file && (
                <div className="bg-light p-3 rounded mb-4">
                  <div className="d-flex align-items-center">
                    <BsBuilding className="text-primary me-2" />
                    <span className="fw-medium">{file.name}</span>
                    <small className="text-muted ms-2">({(file.size / 1024).toFixed(2)} KB)</small>
                  </div>
                </div>
              )}

              {importing && (
                <div className="mb-4">
                  <p className="mb-2">Importing accommodations...</p>
                  <ProgressBar now={progress} label={`${progress}%`} className="mb-3" />
                </div>
              )}

              {importSuccess && (
                <Alert variant="success" className="d-flex mb-4">
                  <BsCheckCircle className="me-2 mt-1" />
                  <div>
                    <p className="mb-0 fw-medium">Import Successful!</p>
                    <p className="mb-0">Added {preview?.length || 0} new accommodations.</p>
                  </div>
                </Alert>
              )}

              <div className="mt-4">
                <Form.Check 
                  type="checkbox"
                  id="update-existing-accommodations"
                  label="Update existing accommodations"
                  className="mb-2"
                />
                
                {file && !importing && !importSuccess && (
                  <Button 
                    variant="primary" 
                    className="w-100 rounded-pill mt-3"
                    onClick={handleImport}
                  >
                    Import Accommodations
                  </Button>
                )}
                
                {importSuccess && (
                  <Button 
                    variant="outline-primary" 
                    className="w-100 rounded-pill mt-3"
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                      setImportSuccess(false);
                    }}
                  >
                    Import Another File
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm mt-4">
            <Card.Body className="p-4">
              <h5 className="mb-3">Import Tips</h5>
              <ul className="mb-0 ps-3">
                <li className="mb-2">Make sure your file has columns for name, type, address, and number of rooms</li>
                <li className="mb-2">Maximum file size is 10MB</li>
                <li className="mb-2">Supported formats: CSV, Excel (.xlsx, .xls)</li>
                <li>For large files, import may take several minutes</li>
              </ul>
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
                        <th>Name</th>
                        <th>Type</th>
                        <th>Address</th>
                        <th>Rooms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((accommodation, index) => (
                        <tr key={index}>
                          <td>{accommodation.name}</td>
                          <td>{accommodation.type}</td>
                          <td>{accommodation.address}</td>
                          <td>{accommodation.rooms}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <BsBuilding size={36} className="mb-3" />
                  <p>Upload a file to see a preview</p>
                </div>
              )}
            </Card.Body>
          </Card>

          {file && (
            <Card className="border-0 shadow-sm mt-4">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <BsExclamationTriangle className="text-warning me-2" />
                  <h5 className="mb-0">Before You Import</h5>
                </div>
                <p className="text-muted mb-0">
                  This import will add {preview?.length || 0} new accommodations to your system. Make sure the data is correct before proceeding. If you select "Update existing accommodations," any existing records with the same name will be updated with the new information.
                </p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AccommodationImport; 