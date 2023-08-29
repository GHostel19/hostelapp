import React, { Component } from 'react'
import axios from 'axios';
;

export class Reportmoves extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         reason: '',
         activity: '',
         location: '',
         msg: {}
      }
    }

    changeHandle=(e)=> {
        this.setState({[e.target.name]: e.target.value})
    }
    SubmitHandle=async (e) => {
        e.preventDefault();
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
  const user = {
    reason: this.state.reason,
    activity: this.state.activity,
    location: this.state.location
  }
  const res = await axios.post('/api/create/movespost',user, config);
  if (res.status === 200) {
    this.setState({ msg: res.data.msg, reason: '', activity: '', location: '' }); // Clear input fields and show success message
    var x = document.getElementById("snackbar");
    x.className = "show bg-success";
    setTimeout(function() { x.className.replace("show", ""); }, 3000);
    // Don't redirect immediately, you might want to keep the user on the same page or provide other options
}
} catch (error) {
if (error.response.data) {
    this.setState({ msg: error.response.data.msg });
    var forErrorMsg = document.getElementById("snackbar");
    forErrorMsg.className = "show bg-danger";
    setTimeout(function() { forErrorMsg.className.replace("show", ""); }, 3000);
}
        }
    }
  render() {
    const navbarStyle = {
      backgroundColor : "#ce93d8"
  }
    const {msg} = this.state;
    return (
     <div className = "container">
        {msg.length ? msg.map(errMsg => (
                  <div key={errMsg.msg} id="snackbar">
                    <strong>{errMsg.msg}</strong>
                  </div>
                )) : null}
        <div className="row">
            <div className="col-md-6 m-auto">
                <div className="card shadow my-5">
                <div className="card-header " style={navbarStyle}>
                    <h3 className="text-center text-light">
                        Report your Moves
                    </h3>
                    </div>
                    <div className="card-body">
                    <form onSubmit={this.SubmitHandle}>
                  <div className="row">

                    <div class="mb-3">
                      <label for="reason" class="form-label">Reason</label>
                      <input type="text" class="form-control form-control-sm"
                        id="reason" value={this.state.reason} onChange={this.changeHandle} name='reason'/>

                    </div>
                    <div class="mb-3">
                      <label for="activity" class="form-label">Activity(coming/going)</label>
                      <input type="text" class="form-control form-control-sm"
                        id="activity" value={this.state.activity} onChange={this.changeHandle} name='activity'/>

                    </div>
                    <div class="mb-3">
                      <label for="location" class="form-label">Location</label>
                      <input type="text" class="form-control form-control-sm"
                        id="location" value={this.state.location} onChange={this.changeHandle} name='location'/>

                    </div>



                   
                  </div>
                  <button type="login" class="btn btn-success">Submit</button>
                  {/* <Link to='/profile'>Profile</Link> */}
                </form>
                    </div>
                </div>
            </div>
        </div>
     </div>
    )
  }
}

export default Reportmoves