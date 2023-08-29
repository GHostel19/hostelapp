import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export class NewPassword extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       password: '',
       msg: {}
    }
  }
  changeHandle=(e) => {
      this.setState({[e.target.name]: e.target.value})
  }
  SubmitHandle = async (e) => {
      e.preventDefault();
      try {
        const user = {
          password: this.state.password,
          token: this.props.match.params.id
          
        }
        
    const res = await axios.post('/api/new/password', user, {
      headers: {
        'Content-type': "Application/json"
      }
      
    });

    if (res.status===200) {
      console.log(res.data);
      // this.props.history.push('/login')
      this.setState({msg: res.data.msg});
      var x = document.getElementById("snackbar");
      x.className="show bg-success";
      setTimeout(function() {x.className=x.className.replace("show", "");}, 3000);
    }
    } catch (error) {
      if (error) {
        console.log(error.response.data);
        this.setState({msg: error.response.data.msg});
        var forErrmsg=document.getElementById("snackbar");
        forErrmsg.className="show bg-danger";
        setTimeout(function() {forErrmsg.className=forErrmsg.className.replace("show", "");}, 3000);
      }
  
      }
    }
  render() {
    console.log(this.props);
    const {msg} = this.state;
    return (
      <div className="container">
        <div className="row">
            <div className="col-md-4 m-auto">
                <div className="card shadow-sm my-5">
                    <div className="card-header bg-success">
                        <h3 className="text-center text-light">
                            Create New Password
                        </h3>
                    </div>
                    <div className="card-body">
                    {msg.length ? msg.map(errMsg => (
                  <div key={errMsg.msg} id="snackbar">
                    <strong>{errMsg.msg}</strong>
                  </div>
                )) : null}
                        <form onSubmit={this.SubmitHandle}>
                  <div className="row">

                    <div class="mb-3">
                      <label for="password" class="form-label">Password</label>
                      <input type="password" class="form-control form-control-sm"
                        id="password" value={this.state.password} onChange={this.changeHandle} name='password' aria-describedby="emailHelp" />

                    </div>



                    
                  </div>
                  <button type="login" class="btn btn-success">Submit</button>
                  {/* <Link to='/profile'>Profile</Link> */}
                  {/* <Link className= 'nav-link float-end' to='/login'>Login</Link>  */}
                </form>
                        
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default NewPassword