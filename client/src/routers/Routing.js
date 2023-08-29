// import React from 'react'
// import { Route, Routes, Navigate, useNavigate} from 'react-router-dom';
// import Home from '../components/Home';

// import Login from '../components/Login';
// import Profile from '../components/Profile';

// const PrivateRoute = ({component: Component, ...rest}) => {
//     return  <Route {...rest} render={(props) => {
//         return localStorage.getItem('token') ? <Component {...props} /> : <Navigate to = "/" />
//     }} /> 
    
    
// }

// const withNavigate = Component => props => {
//   const navigate = useNavigate();
//   return <Component {...props} navigate={"/"} />
// }



// const Routing =() => {
//   return (
//    <Routes>
    
//     <Route exact path='/' component={Home} />
//     <Route exact path='/login' component={Login} /> 
//     <Route exact path='/profile' component={Profile} /> 

//    </Routes>
//   )
// }

// export default Routing