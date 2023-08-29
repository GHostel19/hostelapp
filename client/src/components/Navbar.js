import React, { Component } from 'react'
import { Link, redirect } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';
// import Login from '../components/Login'

export class Navbar extends Component {
    constructor(props) {
        // let loggedIn = true
        super(props)
    
        this.state = {
        //   checkRole: ([]),
        role: localStorage.getItem('token') ? localStorage.getItem('role') : null,
        //   msg: {},
        //   loggedIn 
        }
      }

      logout = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');

       
        redirect('/login')
        
        // <Link className= 'nav-link float-end' to='/password/forget'>Forgot Password?</Link>

    }
    render() {
        // const { user } = this.props.auth;
        
        const { role } = this.state;

    const isLoggedIn = localStorage.getItem('token');

        const forLogin = (
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    
                   <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Login Here
  </button>
  <ul class="dropdown-menu " aria-labelledby="dropdownMenuButton1">
            <li><a class="dropdown-item" href="/login">Student Login</a></li>
            <li><a class="dropdown-item" href="login-warden">Warden Login</a></li>
            <li><a class="dropdown-item" href="login-staff">Staff Login</a></li>
            
          </ul>
        
        </div>
                    


                </ul>
            </div>
        )
        const UserLink = (
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto" >
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/profile">Profile</Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/reportmoves">ReportMove</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/query">Query Section</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/myquery">My Reported Queries</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/markattendence">Markattendance</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/history">History</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/next">Allotment List</Link>
                    </li>
                    <li>
          <Logout />
        </li>
                    


                </ul>
            </div>
        )
        const StaffLink = (
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/staffprofile">StaffProfile</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/mentionvisitor">Mention Visitors</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/viewrecords">Visitors Records</Link>
                    </li>
                    
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/next">Allotment List</Link>
                    </li>
                    <li>
          <Logout />
        </li>
                    

                </ul>
            </div>
        )

        const WardenLink = (
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/wardenprofile">Wardenprofile</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/viewstudata">ViewStuData</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/viewrecords">Visitors Records</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/viewquery">Queries</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/fileupload">Allocate</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/next">Allotment List</Link>
                    </li>
                    
                    <li>
          <Logout />
        </li>

        

                   

                </ul>
            </div>
        )

        const navbarStyle = {
            backgroundColor : "#6a1b9a"
        }

        const renderLinks = () => {
            console.log("isLoggedIn:", isLoggedIn);
            console.log("role:", role);
          
            if (isLoggedIn) {
              switch (role) {
                case 'student':
                  console.log("Rendering UserLink");
                  return UserLink;
                case 'staff':
                  console.log("Rendering StaffLink");
                  return StaffLink;
                case 'warden':
                  console.log("Rendering WardenLink");
                  return WardenLink;
                default:
                  console.log("Rendering Default (forLogin)");
                  return forLogin;
              }
            } else {
              console.log("Rendering Default (forLogin)");
              return forLogin;
            }
          };
          
        
        return (
            <div>
               

                <nav class="navbar navbar-expand-lg navbar-dark " style={navbarStyle}>
                    <div class="container-fluid">
                        <a href="#" class="navbar-brand">Reporting And Allotment Automation</a>
                        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>


                         {/* {localStorage.getItem('token') && checkRole == "student" ? UserLink : localStorage.getItem('token') && checkRole == "warden" ? WardenLink : localStorage.getItem('token') && checkRole == "staff" ? StaffLink : forLogin} */}
                        {/* {localStorage.getItem('token') && 'user.role == admin'? WardenLink:forLogin} */}
                        {/* {localStorage.getItem('token') ? UserLink : forLogin} */}
                        {/* {localStorage.getItem('token') ? WardenLink : forLogin} */}
                        {/* {localStorage.getItem('token') ? StaffLink : forLogin} */}
                         {/* {localStorage.getItem('token' && 'role==warden') ? WardenLink  : UserLink }  */}

                         {renderLinks()}



                    </div>
                    
                </nav>
            </div>
        )
    }
}

// export default withRouter (Navbar)
export default Navbar