import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/allocate'); // Replace '/next-page' with the path of your next page
  };

  const handleFileUpload = async () => {
    if (file1 && file2) {
      try {
        const formData1 = new FormData();
        formData1.append('file', file1);
        await axios.post('http://localhost:2000/api/create', formData1);

        const formData2 = new FormData();
        formData2.append('file', file2);
        await axios.post('http://localhost:2000/api/stu/create', formData2);

        // Reset state and show success message if needed
        setFile1(null);
        setFile2(null);
      } catch (error) {
        // Handle error, show error message if needed
        console.error('Error uploading files:', error);
      }
    } else {
      // Handle case when both files are not selected
      console.error('Please select both files.');
    }
  };

  const uploadLabelStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: '10px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const buttonStyle = {
    fontSize: '18px',
    padding: '10px 20px',
    width: '100%', // Set the button width to 100% of the container
  };

  return (
    <div className="container mt-4" style={containerStyle}>
      <div className="row">
        <div className="col">
          <div className="mb-3">
            <label htmlFor="file1" style={uploadLabelStyle}>
              Upload Rooms File
            </label>
            <input type="file" id="file1" className="form-control" onChange={handleFile1Change} />
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="file2" style={uploadLabelStyle}>
              Upload Students File
            </label>
            <input type="file" id="file2" className="form-control" onChange={handleFile2Change} />
          </div>
        </div>
      </div>
      <div className="d-grid">
        <button className="btn btn-primary" onClick={handleFileUpload} style={buttonStyle}>
          Upload Files
        </button>
        <div style={{ marginTop: '20px', width: '100%' }}>
          <button className="btn btn-primary" onClick={handleButtonClick} style={buttonStyle}>
            Allocate
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
