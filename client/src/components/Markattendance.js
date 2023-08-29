import React, { useState } from 'react';
import axios from 'axios';

function Markattendance() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [altitude, setAltitude] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const getCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setAltitude(position.coords.altitude);

          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );

            if (response.data.results.length > 0) {
              setAddress(response.data.results[0].formatted_address);
            } else {
              setAddress('Address not available');
            }
          } catch (error) {
            console.error('Error getting address:', error.message);
            setAddress('Address not available');
          }
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const submitAttendance = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('You need to be logged in to submit attendance.');
        return;
      }

      const config = {
        headers: {
          'Content-type': 'application/json',
          'Authorization': token,
        },
      };

      if (!latitude || !longitude) {
        setMessage('Incomplete location data. Please fetch location first.');
        return;
      }

      const data = {
        latitude: latitude,
        longitude: longitude,
        altitude: altitude,
        address: address,
      };

      const response = await axios.post('/api/create/markattendance', data, config);
      setMessage(response.data.msg);
    } catch (error) {
      console.error('Error submitting attendance:', error.message);
      setMessage('Error submitting attendance.');
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Mark Attendance</h1>
      <button style={getLocationButtonStyle} onClick={getCurrentLocation}>Get Current Location</button>
      <div style={locationSectionStyle}>
        <p><strong>Latitude:</strong> {latitude}</p>
        <p><strong>Longitude:</strong> {longitude}</p>
        <p><strong>Altitude:</strong> {altitude}</p>
        <p><strong>Address:</strong> {address}</p>
      </div>
      <button style={submitButtonStyle} onClick={submitAttendance}>Submit Attendance</button>
      <p style={messageStyle}>{message}</p>
    </div>
  );
}

// Styles
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center',
  color: '#666',
};

const titleStyle = {
  color: 'purple',
};

const getLocationButtonStyle = {
  background: 'purple',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
};

const locationSectionStyle = {
  background: '#f2f2f2',
  borderRadius: '10px',
  padding: '10px',
  margin: '10px 0',
};

const submitButtonStyle = {
  background: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  marginTop: '10px',
};

const messageStyle = {
  color: 'purple',
  fontWeight: 'bold',
};

export default Markattendance;
