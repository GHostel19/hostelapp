// import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
// import axios from 'axios';
// export class LoginStaff extends Component {
//   constructor(props) {
//     super(props)
// this.state = {
//        username:'',
//        password:'',
//        token:'',
//        msg:{}
//     }

//   }
// changeHandle=(e) => {
//     this.setState({[e.target.name]: e.target.value})
//   }

//   SubmitHandle = async (e) => {
//     e.preventDefault();
//     try {
//       const user = {
//         username: this.state.username,
//         password: this.state.password
//       }
      
//   const res = await axios.post('/api/login-staff',  user, {
//     headers: {
//       'Content-type': "Application/json"
//     }
    
//   });
  
//   if (res.status===200) {
//     console.log(res.data);
//     this.setState({token: res.data.token})
    
//     localStorage.setItem('token', res.data.token)
    
//     this.props.history.push('/profile')
//   }
//   } catch (error) {
//     if (error) {
//       console.log(error.response.data);
//       this.setState({msg: error.response.data.msg});
//       var forErrmsg=document.getElementById("snackbar");
//       forErrmsg.className="show bg-danger";
//       setTimeout(function() {forErrmsg.className=forErrmsg.className.replace("show", "");}, 3000);
//     }

//     }
//   }
//   render() {
//     const { msg } = this.state;
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4 m-auto">
//             <div className="card shadow-sm my-5">
//               <div className="card-header bg-success">
//                 <h3 className="text-light">Staff Login</h3>

//               </div>
//               <div className="card-body">
//                 {msg.length ? msg.map(errMsg => (
//                   <div key={errMsg.msg} id="snackbar">
//                     <strong>{errMsg.msg}</strong>
//                   </div>
//                 )) : null}
//                 <form onSubmit={this.SubmitHandle}>
//                   <div className="row">

//                     <div class="mb-3">
//                       <label for="username" class="form-label">UserName</label>
//                       <input type="text" class="form-control form-control-sm"
//                         id="username" value={this.state.username} onChange={this.changeHandle} name='username' aria-describedby="emailHelp" />

//                     </div>



//                     <div class="mb-3">
//                       <label for="password" class="form-label">Password</label>
//                       <input type="password" value={this.state.password} onChange={this.changeHandle} name='password' class="form-control 
//                         form-control-sm" id="password" />


//                     </div>
//                   </div>
//                   <button type="login" class="btn btn-success">Login</button>
                  
//                   <Link className= 'nav-link float-end' to='/password/forget'>Forgot Password?</Link>
//                 </form>
//               </div>

//             </div>

//           </div>
//         </div>

//       </div>
//     )
//   }
// }

// export default LoginStaff
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginStaff = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState([]);
  const navigate = useNavigate();

  const changeHandle = (e) => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username,
        password,
      };

      const res = await axios.post('/api/login-staff', user, {
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('role', res.data.role);
        navigate('/staffprofile');
        window.location.reload(true);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data);
        setMsg(error.response.data.msg);
        var forErrmsg = document.getElementById('snackbar');
        forErrmsg.className = 'show bg-danger';
        setTimeout(function () {
          forErrmsg.className = forErrmsg.className.replace('show', '');
        }, 3000);
      }
    }
  };
  const navbarStyle = {
    backgroundColor : "#6a1b9a"
}
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 m-auto">
          <div className="card shadow-sm my-5">
            <div className="card-header " style={navbarStyle}>
              <h3 className="text-light">Staff Login</h3>
            </div>
            <div className="card-body">
              {msg.length
                ? msg.map((errMsg, index) => (
                    <div key={index} id="snackbar">
                      <strong>{errMsg}</strong>
                    </div>
                  ))
                : null}
              <form onSubmit={submitHandle}>
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      UserName
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="username"
                      value={username}
                      onChange={changeHandle}
                      name="username"
                      aria-describedby="emailHelp"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={changeHandle}
                      name="password"
                      className="form-control form-control-sm"
                      id="password"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-success">
                  Login
                </button>
                <Link className="nav-link float-end" to="/password/forget">
                  Forgot Password?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginStaff;

