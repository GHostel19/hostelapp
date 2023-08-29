import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Navwarden extends Component {
    logout = (e) => {
        e.preventDefault();

        localStorage.removeItem('token');

        this.props.history.push('/login')
        

    }
    render() {
        
        const forLogin = (
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link active" aria-current="page" to="/login">Login</Link>
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
                        <Link class="nav-link active" aria-current="page" to="/allocate">Allocate</Link>
                    </li>

                    <li class="nav-item">
                        <Link class="nav-link active" onClick={this.logout.bind(this)} aria-current="page" to="#">Logout</Link>
                    </li>

                </ul>
            </div>
        )
        return (
            <div>
               

                {/* <nav class="navbar navbar-expand-lg navbar-dark bg-success">
                    <div class="container-fluid">
                        <a href="#" class="navbar-brand">Reporting And Allotment Automation</a>
                        <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button> */}
                        {/* {localStorage.getItem('token') ? WardenLink : forLogin} */}
                        
                    {/* </div>
                    
                    </nav> */}
                </div>
            )
        }
    }
    
    
    export default Navwarden