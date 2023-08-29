// import React, { Component } from 'react'
// import axios from 'axios';
// import Moment from 'react-moment';

// export class ViewVisitrecords extends Component {
//     constructor(props) {
//         super(props)
      
//         this.state = {
//            allpost: {},
//            msg: {}
//         }
//       }
//       async componentDidMount() {
//           try {
            
//             const res = await axios.get('/api/all/visitrecords');
//             if (res.status === 200) {
//               this.setState({allpost: res.data})
//               console.log(res.data);
              
//             }
//           } catch (error) {
//             if(error){
//                 console.log(error)
//             }

            
//         }
//           }
            
//   render() {
//     const {allpost}=this.state;
//     const navbarStyle = {
//       backgroundColor : "#ce93d8"
//   }
//     return (
//         <div className="container">
//         <div className="row">
            
//             <div className="col-md-10 m-auto">
//                 {
//                     allpost.length? allpost.map((post, index) => {
//                         return (
                    
//                 <div className="card shadow my-5">
//                     <div className="card-header " style={navbarStyle}>
//                         <small class="text-light">{index+1}</small>
//                         <h3 className="text-light">
//                             Visitors Records
//                         </h3>
//                 </div>
//                 <div className="card-body">
//                   <hr />
//                   {/* <p className="card-text">
//                   <b>UserName</b><span className="float-end">{post.username}</span>
//                 </p> */}
//                   <p className="card-text">
//                   <b>Student Name</b><span className="float-end">{post.name}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Registration Name</b><span className="float-end">{post.regNo}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Branch</b><span className="float-end">{post.branch}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Room No</b><span className="float-end">{post.roomNumber}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Visitor Name</b><span className="float-end">{post.visitor_name}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Relation</b><span className="float-end">{post.relation}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Stay Duration</b><span className="float-end">{post.stayduration}</span>
//                 </p>
//                 <p className="card-text">
//                   <b>Phone No</b><span className="float-end">{post.phoneNo}</span>
//                 </p>
                
//                 <p className="card-text">
//                   <b>Date</b><span className="float-end"><Moment format='lll'>{post.date}</Moment></span>
//                 </p>
                    
//                 </div>
//                 </div>
//                         )
//                         }):null
//                     }
//             </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default ViewVisitrecords


import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import this for autoTable support

export class ViewVisitrecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allpost: [],
      msg: {},
    };
  }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/all/visitrecords');
      if (res.status === 200) {
        this.setState({ allpost: res.data });
        console.log(res.data);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }
  handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/visitrecord/${id}`);
      if (res.status === 200) {
        // Remove the deleted record from the state
        const updatedRecords = this.state.allpost.filter(record => record._id !== id);
        this.setState({ allpost: updatedRecords });
        console.log('Record deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  handleDownloadCSV = () => {
    const csv = Papa.unparse(this.state.allpost);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'visit_records.csv';
    link.click();
  };

  handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [ 'Student Name', 'Registration No', 'Branch', 'Room No', 'Visitor Name', 'Relation', 'Stay Duration', 'Phone No', 'Date']
      ],
      body: this.state.allpost.map(post => [
        post.name,
        post.regNo,
        post.branch,
        post.roomNumber,
        post.visitor_name,
        post.relation,
        post.stayduration,
        post.phoneNo,
        <Moment format="lll">{post.date}</Moment>
      ]),
    });
    doc.save('visit_records.pdf');
  };

  render() {
    const { allpost } = this.state;
    const tableContainerStyle = {
      marginTop: '20px',
    };

    const tableStyle = {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid #ddd',
    };

    const tableHeaderStyle = {
      backgroundColor: '#ce93d8',
      color: 'white',
      fontWeight: 'bold',
    };

    const cellStyle = {
      padding: '10px',
      borderBottom: '1px solid #ddd',
      borderRight: '1px solid #ddd',
    };

    const headingStyle = {
      textAlign: 'center',
      backgroundColor: '#ce93d8',
      color: 'white',
      padding: '10px',
      marginBottom: '10px', // Added margin at the bottom
      marginTop: '10px', // Added margin at the top
      borderRadius: '10px',
      fontWeight: 'bold',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };
    const buttonContainerStyle = {
      marginTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '10px',
    };
    const greenButtonStyle = {
      backgroundColor: 'green',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '4px',
      cursor: 'pointer',
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-10 m-auto">
            <h2 style={headingStyle}>Visitors Record</h2>
            <div style={tableContainerStyle}>
              {allpost.length ? (
                <table style={tableStyle}>
                  <thead>
                    <tr style={tableHeaderStyle}>
                      <th style={cellStyle}>Serial No</th>
                      <th style={cellStyle}>Student Name</th>
                      <th style={cellStyle}>Registration No</th>
                      <th style={cellStyle}>Branch</th>
                      <th style={cellStyle}>Room No</th>
                      <th style={cellStyle}>Visitor Name</th>
                      <th style={cellStyle}>Relation</th>
                      <th style={cellStyle}>Stay Duration</th>
                      <th style={cellStyle}>Phone No</th>
                      <th style={cellStyle}>Date</th>
                      <th style={cellStyle}>Delete</th> {/* New Delete column */}
                    </tr>
                  </thead>
                  <tbody>
                    {allpost.map((post, index) => (
                      <tr key={index}>
                        <td style={cellStyle}>{index + 1}</td>
                        <td style={cellStyle}>{post.name}</td>
                        <td style={cellStyle}>{post.regNo}</td>
                        <td style={cellStyle}>{post.branch}</td>
                        <td style={cellStyle}>{post.roomNumber}</td>
                        <td style={cellStyle}>{post.visitor_name}</td>
                        <td style={cellStyle}>{post.relation}</td>
                        <td style={cellStyle}>{post.stayduration}</td>
                        <td style={cellStyle}>{post.phoneNo}</td>
                        <td style={cellStyle}>
                          <Moment format="lll">{post.date}</Moment>
                        </td>
                        <td style={cellStyle}>
                          <button onClick={() => this.handleDelete(post._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : null}
            </div>
            <div style={buttonContainerStyle}>
              <button style={greenButtonStyle} onClick={this.handleDownloadCSV}>
                Download CSV
              </button>
              <button style={greenButtonStyle} onClick={this.handleDownloadPDF}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
        {/* <button onClick={this.handleDownloadCSV}>Download CSV</button>
        <button onClick={this.handleDownloadPDF}>Download PDF</button> */}
      </div>
    );
  }
}

export default ViewVisitrecords;
