import './App.css';
import { Fragment } from 'react';

import Navbar from './components/Navbar';
import Home from './components/Home';
// import Private from './components/Private'

import Login from './components/Login';
import Profile from './components/Profile';
import History from './components/History';

// import Routing from './routers/Routing'
import { BrowserRouter as Router, Route, Routes, NavLink, BrowserRouter, Navigate } from 'react-router-dom'
import Reportmoves from './components/Reportmoves';
import Markattendance from './components/Markattendance';
import Wardenprofile from './components/Wardenprofile';
import StaffProfile from './components/StaffProfile';
import ViewStuData from './components/ViewStuData';
import Viewreportmoves from './components/Viewreportmoves';
import Viewattend from './components/Viewattend';
import Allocate from './components/Allocate';
import PasswordForget from './components/PasswordForget';
import NewPassword from './components/NewPassword';
import LoginWarden from './components/LoginWarden';
import LoginStaff from './components/LoginStaff'
import Navwarden from './components/Navwarden';
import Navstaff from './components/Navstaff';
import MentionVisitors from './components/MentionVisitors';
import ViewVisitrecords from './components/ViewVisitrecords';
import QuerySection from './components/QuerySection';
import QueryRes from './components/QueryRes';
import AllQuery from './components/AllQuery';
import Myquery from './components/Myquery';
import Update from './components/Update';
import Add from './components/Add';
import Logout from './components/Logout';
import Next from './components/Next';
import FileUpload from './components/FileUpload';

//define private routes here
const isAuthenticated = true; // Replace this with your actual authentication logic



const PrivateRoute = ({ element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Element /> : <Navigate to="/login" />}
    />
  );
};


function App() {
  return (
  //  <BrowserRouter>
  //  <Fragment>
   <Router>
    <Navbar />
    <Navwarden />
    <Navstaff />
    <Routes>
    {/* <Route component={Routing} /> */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/logout" element={<Logout />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/reportmoves" element={<Reportmoves />} />
    <Route path="/query" element={<QuerySection />} />
    <Route path="/myquery" element={<Myquery />} />
   <Route path="/viewquery" element={<AllQuery />} />
   
    <Route path="/query/:id" element={<QueryRes />} />
    {/* <Route path="/query/:id" element={<QueryRes />} /> */}
    
    <Route path="/history" element={<History />} />
    <Route path="/markattendence" element={<Markattendance />} />
    <Route path="/wardenprofile" element={<Wardenprofile />} />
    <Route path="/staffprofile" element={<StaffProfile />} />
    <Route path="/viewstudata" element={<ViewStuData />} />
    <Route path="/viewreportmoves" element={<Viewreportmoves />} />
    <Route path="/viewattend" element={<Viewattend />} />
    <Route path="/allocate" element={<Allocate />} />
    <Route path="/password/forget" element={<PasswordForget />} />
    <Route path="/new/password/:id" element={<NewPassword />} />
    <Route path="/login-warden" element={<LoginWarden />} />
    <Route path="/login-staff" element={<LoginStaff />} />
    <Route path="/mentionvisitor" element={<MentionVisitors />} />
    <Route path="/viewrecords" element={<ViewVisitrecords />} />
    <Route path="/create" element={<Add />} />
    <Route path="/next" element={<Next />} />
    <Route path="/fileupload" element={<FileUpload />} />
    <Route path="/update/:id" element={<Update />} />
    {/* <Route path="/profile" element={
    <Private>
    <Profile />
    </Private>} /> */}
    </Routes>
    </Router>
  //  </Fragment>
  //  </BrowserRouter>
  );
}

export default App;
