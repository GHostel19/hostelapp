const bcrypt = require("bcryptjs");
var express = require('express');
var router = express.Router();
// const fileupload = require('express-fileupload');
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/users");
const {SECRET_KEY} = require("../config/default");
const multer = require("multer");

// router.use(fileupload());
var Storage= multer.diskStorage({
  destination:"./public/images/",
  filename:(req,file,cb) =>{
    cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
  }
})
var upload = multer({
  storage:Storage
}).single('file');

/**
 * @DESC To register the user (ADMIN, SUPER_ADMIN, USER)
 */
const userRegister = async (userDets, role, res) => {
  
  try {
    // Validate the username
    let usernameNotTaken = await validateUsername(userDets.username);
    if (!usernameNotTaken) {
      return res.status(400).json({
        message: `Username is already taken.`,
        success: false
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(userDets.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`,
        success: false
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(userDets.password, 12);
   
    // create a new user
    const newUser = new User({
      ...userDets,
      password,
      role,
      // avatar: require.file.filename
      
    });
    
// profileImage.mv('./public/images')
    await newUser.save();
    return res.status(201).json({ msg: [{
      message: "Hurry! now you are successfully registred. Please nor login.",
      success: true
   }] });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({ msg: [{
      message: "Unable to create your account.",
      success: false
  }]});
  }
};

/**
 * @DESC To Login the user (ADMIN, SUPER_ADMIN, USER)
 */
const userLogin = async (userCreds, role, res) => {
  let { username, password } = userCreds;
  // First Check if the username is in the database
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ msg: [{
      message: "Username is not found. Invalid login credentials.",
      success: false
  }]});
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({ msg: [{
      msg: "Please make sure you are logging in from the right portal.",
      success: false
  }]});
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        user_id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      },
      SECRET_KEY,
      { expiresIn: "7 days" }
    );

    let result = {
      username: user.username,
      role: user.role,
      email: user.email,
      token: `Bearer ${token}`,
      expiresIn: 168
    };

    return res.status(200).json({
      ...result,
      message: "Hurray! You are now logged in.",
      success: true
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password.",
      success: false
    });
  }
};

const validateUsername = async username => {
  let user = await User.findOne({ username });
  return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
  !roles.includes(req.user.role)
    ? res.status(401).json("Unauthorized")
    : next();

const validateEmail = async email => {
  let user = await User.findOne({ email });
  return user ? false : true;
};

const serializeUser = user => {
  return {
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    regNo: user.regNo,
    branch: user.branch,
    roomNumber: user.roomNumber,
    phoneNo: user.phoneNo,
    // profileImage: user.profileImage,
    designation: user.designation,
    
    _id: user._id,
    updatedAt: user.updatedAt,
    createdAt: user.createdAt
  };
};

module.exports = {
  userAuth,
  checkRole,
  userLogin,
  userRegister,
  serializeUser,
  upload
};