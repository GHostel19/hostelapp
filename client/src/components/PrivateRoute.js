// import { Navigate, Route, Routes } from "react-router-dom";

// const Private = ({component: Component}) => {
    // const isAuthenticated = false;
//     return localStorage.getItem('token') ? Component : <Navigate to="/" />
// }
// export default Private;



// const Private = ({component: Component, ...rest}) => {
//       return <Routes> <Route {...rest} render={(props) => {
//           return localStorage.getItem('token') ? <Component {...props} /> : <Navigate to = "/" />
//       }} /> </Routes>
//     }
//     export default Private;

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
