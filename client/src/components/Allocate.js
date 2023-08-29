import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Allocate = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/Next');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response1 = await axios.get('http://localhost:2000/api/all/rooms');
      setData1(response1.data);

      const response2 = await axios.get('http://localhost:2000/api/all/prevstudents');
      setData2(response2.data);

      setLoading(false);
    } catch (error) {
      setError('Error fetching data');
      setLoading(false);
    }
  };

  function handleSubmit(_id) {
    const conf = window.confirm('Do you want to delete?');
    if (conf) {
      axios
        .delete('http://localhost:2000/api/all/stud/' + _id)
        .then(res => {
          alert('Record has been deleted');
          navigate('/Allocate');
          window.location.reload(true);
        })
        .catch(err => console.log(err));
    }
  }

  return (
    <div style={{ textAlign: 'center', margin: '0 auto', maxWidth: '800px' }}>
      <h1>ALLOTMENT LIST</h1>
      <div className='text-end'>
        <Link to='/create' className='btn btn-primary'>
          Add +
        </Link>
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>S.NO.</th>
            <th style={tableHeaderStyle}>ROOM NO.</th>
            <th style={tableHeaderStyle}>ROOM TYPE</th>
            <th style={tableHeaderStyle}>NAME</th>
            <th style={tableHeaderStyle}>Roll No</th>
            <th style={tableHeaderStyle}>SEMESTER</th>
            <th style={tableHeaderStyle}>GRADE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data1.map((row, index) => (
            <tr key={index}>
              {data2[index] && (
                <>
                  <td style={tableCellStyle}>{index + 1}</td>
                  <td style={tableCellStyle}>{row.roomno}</td>
                  <td style={tableCellStyle}>{row.roomtype}</td>
                  <td style={tableCellStyle}>{data2[index].name}</td>
                  <td style={tableCellStyle}>{data2[index].rollno}</td>
                  <td style={tableCellStyle}>{data2[index].semester}</td>
                  <td style={tableCellStyle}>{data2[index].grade}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <Link to={`/update/${data2[index]._id}`} className='btn btn-sm btn-success'>
                        Update
                      </Link>
                      <button onClick={e => handleSubmit(data2[index]._id)} className='btn btn-sm btn-danger'>
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button className='btn btn-primary' onClick={handleButtonClick}>
          Release
        </button>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  backgroundColor: '#f2f2f2',
  padding: '10px',
  border: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

export default Allocate;
