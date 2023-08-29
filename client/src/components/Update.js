import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isModified, setIsModified] = useState(false);
  const [showFillFieldsMessage, setShowFillFieldsMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2000/api/stud/' + id)
      .then((res) => setData(res.data.data)) // Assuming response structure: { status, message, data }
      .catch((err) => console.log(err));
  }, [id]);

  function handleFieldChange(field, value) {
    setData({ ...data, [field]: value });
    setIsModified(true);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!isModified) {
      setShowFillFieldsMessage(true);
      return;
    }

    axios
      .put('http://localhost:2000/api/stud/' + id, data)
      .then((res) => {
        alert('Data updated successfully!');
        navigate('/allocate');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
      <h1 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Update Student Details</h1>
        {Object.keys(data).length > 0 ? (
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                value={data.name || ''}
                className='form-control'
                onChange={(e) => handleFieldChange('name', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='rollno'>Roll No:</label>
              <input
                type='text'
                name='rollno'
                value={data.rollno || ''}
                className='form-control'
                onChange={(e) => handleFieldChange('rollno', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='semester'>Semester:</label>
              <input
                type='text'
                name='semester'
                value={data.semester || ''}
                className='form-control'
                onChange={(e) => handleFieldChange('semester', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor='grade'>Grade:</label>
              <input
                type='text'
                value={data.grade || ''}
                name='grade'
                className='form-control'
                onChange={(e) => handleFieldChange('grade', e.target.value)}
              />
            </div>
            <br />
            {showFillFieldsMessage && (
              <p className='text-danger'>Please make changes before updating.</p>
            )}
            <button className='btn btn-info'>Update</button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Update;
