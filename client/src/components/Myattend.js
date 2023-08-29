import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

const Myattend = () => {
  const navigate = useNavigate();
  const [myatten, setMyatten] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };
        if (token) {
          config.headers['Authorization'] = token;
        }
        const res = await axios.get('/api/myattend/user', config);
        if (res.status === 200) {
          setMyatten(res.data);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [navigate]);

  const tableStyle = {
    border: "2px solid #ce93d8",
    borderRadius: "8px",
    marginTop: "20px",
  };

  const tableHeadingStyle = {
    backgroundColor: "#ce93d8",
    color: "#fff",
    border: "2px solid #ce93d8",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
  };

  const tableCellStyle = {
    border: "2px solid #ce93d8",
    padding: "8px",
  };

  return (
    <div className="container-fluid">
      <div className="row m-right">
        <div className="col-md-10 m-auto">
          <h3 className="text-center">Your Attendance</h3>
          <table className="table table-bordered" style={tableStyle}>
            <thead style={tableHeadingStyle}>
              <tr>
                <th scope="col">Serial No</th>
                <th scope="col">Latitude</th>
                <th scope="col">Longitude</th>
                <th scope="col">Altitude</th>
                <th scope="col">Address</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {myatten.map((post, index) => (
                <tr key={index} style={tableCellStyle}>
                  <td>{index + 1}</td>
                  <td>{post.latitude}</td>
                  <td>{post.longitude}</td>
                  <td>{post.altitude}</td>
                  <td>{post.address}</td>
                  <td><Moment format='lll'>{post.date}</Moment></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Myattend;
