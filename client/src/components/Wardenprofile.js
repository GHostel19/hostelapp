import React, { Component } from 'react'
import axios from 'axios';
import Moment from 'react-moment';

export class Wardenprofile extends Component {
  constructor(props) {
    let loggedIn = true
    super(props)

    this.state = {
      UserData: {},
      msg: {},
      loggedIn 
    }
  }
  async componentDidMount() {
try {
  // get token from localStorage
  const token = localStorage.getItem('token');
  //Headers
  const config={
    headers: {
      'Content-type':"application/json"
    }
  };
  if (token) {
    config.headers['Authorization'] = token
  }
  const res = await axios.get('/api/profile', config);
  if (res.status === 200) {
    this.setState({UserData: res.data})
    
  }
} catch (error) {
  if (error.response.status === 401) {
    this.setState({loggedIn : false})
    localStorage.removeItem('token');
    this.props.history.push('/login')
  }
  
}
  }
  render() {
    const {UserData}=this.state;
    const navbarStyle = {
      backgroundColor : "#6a1b9a"
  }
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card shadow my-5">
              <div className="card-header " style={navbarStyle}>
                <h4 className="text-centre text-light">Warden Profile</h4>

              </div>
              <div className="card-body">
                <hr />
                <p className="card-text">
                  <b>UserName</b><span className="float-end">{UserData.username}</span>
                </p>
                <p className="card-text">
                  <b>Name</b><span className="float-end">{UserData.name}</span>
                </p>
                {/* <p className="card-text">
                  <b>Registration Number</b><span className="float-end">{UserData.regNo}</span>
                </p> */}
                {/* <p className="card-text">
                  <b>Branch</b><span className="float-end">{UserData.branch}</span>
                </p> */}
                {/* <p className="card-text">
                  <b>Room Number</b><span className="float-end">{UserData.roomNumber}</span>
                </p> */}
                <p className="card-text">
                  <b>Phone Number</b><span className="float-end">{UserData.phoneNo}</span>
                </p>
                <p className="card-text">
                  <b>Email ID</b><span className="float-end">{UserData.email}</span>
                </p>
                <p className="card-text">
                  <b>Designation</b><span className="float-end">{UserData.designation}</span>
                </p>
                <p className="card-text">
                  <b>Date</b><span className="float-end"><Moment format='lll'>{UserData.date}</Moment></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Wardenprofile