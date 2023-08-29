// import React, { Component } from 'react'
// import axios from 'axios';
// ;

// export class MentionVisitors extends Component {
//     constructor(props) {
//       super(props)
    
//       this.state = {
//          student_name: '',
//          regNo: '',
//          branch: '',
//          roomNo: '',
//          visitor_name: '',
//          relation: '',
//          stayduration: '',
//          phoneNo: '',
//          msg: {}
//       }
//     }

//     changeHandle=(e)=> {
//         this.setState({[e.target.name]: e.target.value})
//     }
//     SubmitHandle=async (e) => {
//         e.preventDefault();
//         try {
//             // get token from localStorage
//   const token = localStorage.getItem('token');
//   //Headers
//   const config={
//     headers: {
//       'Content-type':"application/json"
//     }
//   };
//   if (token) {
//     config.headers['Authorization'] = token
//   }
//   const user = {
//     student_name: this.state.student_name,
//     regNo: this.state.regNo,
//     branch: this.state.branch,
//     roomNo: this.state.roomNo,
//     visitor_name: this.state.visitor_name,
//     relation: this.state.relation,
//     stayduration: this.state.stayduration,
//     phoneNo: this.state.phoneNo
//   }
//   const res = await axios.post('/api/create/visitrecords',user, config);
//   if(res.status===200) {
//     this.setState({msg: res.data.msg})
//     var x = document.getElementById("snackbar");
//     x.className="show bg-success";
//     setTimeout(function() {x.className.replace("show", "");}, 3000);
//     this.props.history.push('/')
//   }
//         } catch (error) {
//             if (error.response.data) {
//                 this.setState({msg: error.response.data.msg})
//                 var forErrorMsg=document.getElementById("snackbar");
//                 forErrorMsg.className="show bg-danger";
//                 setTimeout(function() {forErrorMsg.className.replace("show", "");}, 3000);
//             }
//         }
//     }
//   render() {
//     const {msg} = this.state;
//     const navbarStyle = {
//       backgroundColor : "#ce93d8"
//   }
//     return (
//      <div className = "container">
//         {msg.length ? msg.map(errMsg => (
//                   <div key={errMsg.msg} id="snackbar">
//                     <strong>{errMsg.msg}</strong>
//                   </div>
//                 )) : null}
//         <div className="row">
//             <div className="col-md-6 m-auto">
//                 <div className="card shadow my-5">
//                 <div className="card-header " style={navbarStyle}>
//                     <h3 className="text-center text-light">
//                         Mention Visitor Records
//                     </h3>
//                     </div>
//                     <div className="card-body">
//                     <form onSubmit={this.SubmitHandle}>
//                   <div className="row">

                    
//                     <div class="mb-3">
//                       <label for="regNo" class="form-label">Registration No</label>
//                       <input type="text" class="form-control form-control-sm"
//                         id="regNo" value={this.state.regNo} onChange={this.changeHandle} name='regNo'/>

//                      </div>
                    

                    
//                     <div class="mb-3">
//                       <label for="visitor_name" class="form-label">Visitor Name</label>
//                       <input type="text" class="form-control form-control-sm"
//                         id="visitor_name" value={this.state.visitor_name} onChange={this.changeHandle} name='visitor_name'/>

//                     </div>

//                     <div class="mb-3">
//                       <label for="relation" class="form-label">Relation</label>
//                       <input type="text" class="form-control form-control-sm"
//                         id="relation" value={this.state.relation} onChange={this.changeHandle} name='relation'/>

//                     </div>

//                     <div class="mb-3">
//                       <label for="stayduration" class="form-label">Stay Duration</label>
//                       <input type="text" class="form-control form-control-sm"
//                         id="stayduration" value={this.state.stayduration} onChange={this.changeHandle} name='stayduration'/>

//                     </div>

                    



                   
//                   </div>
//                   <button type="login" class="btn btn-success">Submit</button>
//                   {/* <Link to='/profile'>Profile</Link> */}
//                 </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//      </div>
//     )
//   }
// }

// export default MentionVisitors

// import React, { Component } from 'react';
// import axios from 'axios';

// export class MentionVisitors extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       name: '',
//       regNo: '',
//       branch: '',
//       roomNumber: '',
//       visitor_name: '',
//       relation: '',
//       stayduration: '',
//       phoneNo: '',
//       msg: {},
//     };
//   }

//   changeHandle = async (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value });

//     if (name === 'regNo') {
//       if (value === '') {
//         // Clear student details if regNo is empty
//         this.setState({
//           name: '',
//           branch: '',
//           roomNumber: '',
//         });
//       } else {
//         await this.fetchStudentDetails(value);
//       }
//     }
//   };

//   fetchStudentDetails = async (regNo) => {
//     try {
//       const res = await axios.get(`/api/all/visitrecords`); // Use the correct endpoint
//       console.log('Fetch Student Details Response:', res);
//       if (res.status === 200) {
//         const student = res.data.find(item => item.regNo === regNo);
//         if (student) {
//           this.setState({
//             name: student.name,
//             branch: student.branch,
//             roomNumber: student.roomNumber,
//           });
//         } else {
//           // Clear student details if no matching student found
//           this.setState({
//             name: '',
//             branch: '',
//             roomNumber: '',
//           });
//         }
//       }
//     } catch (error) {
//       console.log('Fetch Student Details Error:', error);
//       // Handle error appropriately (e.g., show a message to the user)
//     }
//   };
  

//   SubmitHandle = async (e) => {
//     e.preventDefault();
//     try {
//       // get token from localStorage
//       const token = localStorage.getItem('token');
//       // Headers
//       const config = {
//         headers: {
//           'Content-type': 'application/json',
//         },
//       };
//       if (token) {
//         config.headers['Authorization'] = token;
//       }
//       const user = {
//         name: this.state.name,
//         regNo: this.state.regNo,
//         branch: this.state.branch,
//         roomNumber: this.state.roomNumber,
//         visitor_name: this.state.visitor_name,
//         relation: this.state.relation,
//         stayduration: this.state.stayduration,
//         phoneNo: this.state.phoneNo,
//       };
//       const res = await axios.post('/api/create/visitrecords', user, config);
//       if (res.status === 200) {
//         this.setState({ msg: res.data.msg });
//         var x = document.getElementById('snackbar');
//         x.className = 'show bg-success';
//         setTimeout(function () {
//           x.className.replace('show', '');
//         }, 3000);
//         this.props.history.push('/');
//       }
//     } catch (error) {
//       if (error.response.data) {
//         this.setState({ msg: error.response.data.msg });
//         var forErrorMsg = document.getElementById('snackbar');
//         forErrorMsg.className = 'show bg-danger';
//         setTimeout(function () {
//           forErrorMsg.className.replace('show', '');
//         }, 3000);
//       }
//     }
//   };

//   render() {
//     const { msg } = this.state;
//     const navbarStyle = {
//       backgroundColor: '#ce93d8',
//     };
//     return (
//       <div className="container">
//         {/* Display Messages */}
//         {msg.length ? (
//           <div id="snackbar">
//             {msg.map((errMsg, index) => (
//               <div key={index}>
//                 <strong>{errMsg.msg}</strong>
//               </div>
//             ))}
//           </div>
//         ) : null}

//         {/* Form */}
//         <div className="row">
//           <div className="col-md-6 m-auto">
//             <div className="card shadow my-5">
//               <div className="card-header " style={navbarStyle}>
//                 <h3 className="text-center text-light">Mention Visitor Records</h3>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={this.SubmitHandle}>
//                   {/* Registration Number */}
//                   <div className="mb-3">
//                     <label htmlFor="regNo" className="form-label">
//                       Registration No
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       id="regNo"
//                       value={this.state.regNo}
//                       onChange={this.changeHandle}
//                       name="regNo"
//                     />
//                   </div>

//                   {/* Display Student Details as Hint */}
//                   {this.state.name && (
//                     <div className="mb-3">
//                       <label>Student Name: {this.state.name}</label>
//                       <br />
//                       <label>Branch: {this.state.branch}</label>
//                       <br />
//                       <label>Room No: {this.state.roomNumber}</label>
//                     </div>
//                   )}

//                   {/* Visitor Details */}
//                   <div className="mb-3">
//                     <label htmlFor="visitor_name" className="form-label">
//                       Visitor Name
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       id="visitor_name"
//                       value={this.state.visitor_name}
//                       onChange={this.changeHandle}
//                       name="visitor_name"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="relation" className="form-label">
//                       Relation
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       id="relation"
//                       value={this.state.relation}
//                       onChange={this.changeHandle}
//                       name="relation"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label htmlFor="stayduration" className="form-label">
//                       Stay Duration
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control form-control-sm"
//                       id="stayduration"
//                       value={this.state.stayduration}
//                       onChange={this.changeHandle}
//                       name="stayduration"
//                     />
//                   </div>

//                   {/* Other Form Inputs */}
//                   {/* ... (other form inputs) */}

//                   <button type="submit" className="btn btn-success">
//                     Submit
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default MentionVisitors;

import React, { Component } from 'react';
import axios from 'axios';

export class MentionVisitors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student_name: '',
      regNo: '',
      branch: '',
      roomNo: '',
      visitor_name: '',
      relation: '',
      stayduration: '',
      phoneNo: '',
      msg: {},
    };
  }

  clearStudentDetails = () => {
    this.setState({
      student_name: '',
      branch: '',
      roomNo: '',
    });
  };

  changeHandle = async (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });

    if (name === 'regNo') {
      this.clearStudentDetails(); // Clear details when regNo changes
      await this.fetchStudentDetails(value);
    }
  };

  fetchStudentDetails = async (regNo) => {
    try {
      const res = await axios.get(`/api/getStudentDetails/${regNo}`);
      if (res.status === 200) {
        const student = res.data;
        this.setState({
          student_name: student.name,
          branch: student.branch,
          roomNo: student.roomNumber,
        });
      }
    } catch (error) {
      console.log(error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };
  resetForm = () => {
    this.setState({
      student_name: '',
      regNo: '',
      branch: '',
      roomNo: '',
      visitor_name: '',
      relation: '',
      stayduration: '',
      phoneNo: '',
      msg: {},
    });
  };
  SubmitHandle = async (e) => {
    e.preventDefault();
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
      const user = {
        student_name: this.state.student_name,
        regNo: this.state.regNo,
        branch: this.state.branch,
        roomNo: this.state.roomNo,
        visitor_name: this.state.visitor_name,
        relation: this.state.relation,
        stayduration: this.state.stayduration,
        phoneNo: this.state.phoneNo,
      };
      const res = await axios.post('/api/create/visitrecords', user, config);
      if (res.status === 200) {
        // Clear form fields
        this.setState({
          student_name: '',
          regNo: '',
          branch: '',
          roomNo: '',
          visitor_name: '',
          relation: '',
          stayduration: '',
          phoneNo: '',
          msg: res.data.msg
        });
        this.resetForm();
        this.setState({ msg: res.data.msg });
        var x = document.getElementById('snackbar');
        x.className = 'show bg-success';
        setTimeout(function () {
          x.className=x.className.replace('show', '');
        }, 3000);
        this.props.history.push('/');
      }
       // Clear the form after successful submission
       this.resetForm();

       // Reset the form using the reset method
       document.getElementById('visitorForm').reset();
    } catch (error) {
      if (error.response.data) {
        this.setState({ msg: error.response.data.msg });
        var forErrorMsg = document.getElementById('snackbar');
        forErrorMsg.className = 'show bg-danger';
        setTimeout(function () {
          forErrorMsg.className.replace('show', '');
        }, 3000);
      }
    }
  };

  render() {
    const { msg } = this.state;
    const navbarStyle = {
      backgroundColor: '#ce93d8',
    };
    return (
      <div className="container">
        {msg.length ? (
          <div id="snackbar">
            {msg.map((errMsg, index) => (
              <div key={index}>
                <strong>{errMsg.msg}</strong>
              </div>
            ))}
          </div>
        ) : null}

        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card shadow my-5">
              <div className="card-header " style={navbarStyle}>
                <h3 className="text-center text-light">Mention Visitor Records</h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.SubmitHandle}>
                  <div className="row">
                    <div className="mb-3">
                      <label htmlFor="regNo" className="form-label">
                        Registration No
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="regNo"
                        value={this.state.regNo}
                        onChange={this.changeHandle}
                        name="regNo"
                      />
                    </div>

                    {this.state.student_name && (
                      <div className="mb-3">
                        <label>Student Name: {this.state.student_name}</label>
                        <br />
                        <label>Branch: {this.state.branch}</label>
                        <br />
                        <label>Room No: {this.state.roomNo}</label>
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="visitor_name" className="form-label">
                        Visitor Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="visitor_name"
                        value={this.state.visitor_name}
                        onChange={this.changeHandle}
                        name="visitor_name"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="relation" className="form-label">
                        Relation
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="relation"
                        value={this.state.relation}
                        onChange={this.changeHandle}
                        name="relation"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="stayduration" className="form-label">
                        Stay Duration
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="stayduration"
                        value={this.state.stayduration}
                        onChange={this.changeHandle}
                        name="stayduration"
                      />
                    </div>

                    {/* Other Form Inputs */}
                    {/* ... (other form inputs) */}

                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                   
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MentionVisitors;

