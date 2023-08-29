import React, { Component } from 'react';
import Movesreported from './Movesreported';
import Myattend from './Myattend';

class History extends Component {
  render() {
    const headingStyle = {
      backgroundColor: "#6a1b9a",
      color: "#fff",
      textAlign: "center",
      padding: "10px"
    };

    const historyContainerStyle = {
      marginTop: "60px" // Adjust this value based on your navbar's height
    };

    const columnStyle = {
      width: "100%",
      marginBottom: "20px"
    };

    return (
      <div style={historyContainerStyle}>
        <style>
          {`
            .history-heading {
              background-color: #6a1b9a;
              color: #fff;
              text-align: center;
              padding: 10px;
            }
            @media (max-width: 767px) {
              .col-md-6 {
                width: 100%;
                margin-bottom: 20px;
              }
            }
          `}
        </style>
        <h3 style={headingStyle} className="history-heading">History</h3>
        <div className="row">
          <div className="col-md-6 mb-4" style={columnStyle}>
            <Movesreported />
          </div>
          <div className="col-md-6" style={columnStyle}>
            <Myattend />
          </div>
        </div>
      </div>
    );
  }
}

export default History;
