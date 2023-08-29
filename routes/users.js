var express = require('express');
var router = express.Router();
const users = require('../models/users');
const uploader =require ('../middlewares/uploader');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const {check, validationResult} = require('express-validator');
const fileupload = require('express-fileupload');
const {SECRET_KEY, GMAIL, PASSWORD} = require('../config/default');
const auth = require('../middlewares/auth');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const multer = require('multer');


const transporter = nodemailer.createTransport({
  service: 'gmail',
//   host: "smtp.office365.com", // hostname
// proxy:"Proxy of the company",
// secureConnection: false,
// port: 587,
// tls: {
// ciphers:'SSLv3'
// },
  auth: {
  user: 'GMAIL',
  pass: 'PASSWORD'
  }
})


// const mailOptions= {
//   from: 'yourmail@gmail.com',
//   to: "receivermail@gmail.com",
//   subject: 'sending mail',
//   text: ' that was easy',
//   html: '<p>This is paragraph</p>'
// }

router.use(fileupload());

/* POST  users registration API */

// router.post('/create/user', 
// [
//   check('username', 'Username is required').not().isEmpty(),
  
//   check('name', 'Name is required').not().isEmpty(),
//   check('regNo', 'Registration Number is required').not().isEmpty(),
//   check('branch', 'Branch is required').not().isEmpty(),
//   check('roomNumber', 'RoomNumber is required').not().isEmpty(),
//   check('phoneNo', 'Phone Number is required and of min 10 digits').isLength({min: 10}),
//   check('email', 'Email ID is required').not().isEmpty(),
//   check('password', 'Please enter a Password of atleast 6 characters').isLength({min: 6}),
// ],
// async (req, res, next) => {
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
// return res.status(400).json({msg: errors.array()})
// }

// const {username, name, regNo, branch, roomNumber, phoneNo, email, password} = req.body;
// try {
// let user = await users.findOne({username});
// if (user) {
//   return res.status(400).json({msg:[{msg: 'Username already exists'}]})
// }

// user= new users({
//   username, name, regNo, branch, roomNumber, phoneNo, email, password  

// })
// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(password, salt);
// user.save();

// const payload = {
//   user: {
//     id: user.id
//   }
// }
// jwt.sign(payload, SECRET_KEY, {expiresIn: 36000}, (err, token) => {
//   if (err) {
//     res.json(err)
//   }else {
//     return res.status(200).json({token, user,msg: [{msg: 'Register Sucessfull'}]})
//   }
// })
// } catch (error) {
// if (error) {
//   console.log(error);
// res.status(500).json('Server error')
// }
// }
// })

// Login API

// router.post('/login/user', 
// [
//   check('username', 'Username is required').not().isEmpty(),
//   check('password', 'Please enter a Password of atlaest 6 characters').isLength({min: 6})
// ],
// async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//   return res.status(400).json({msg: errors.array()})
//   }
//   const {username, password}=req.body;
//   try{
// let user = await users.findOne({username})
// if (!user) {
//   return res.status(400).json({msg:[{msg: 'Invalid Credentials'}]})
// }
// const isMatch = await bcrypt.compare(password, user.password)
// if (!isMatch) {
//   return res.status(400).json({msg:[{msg: 'Invalid Credentials'}]})
// }

// const payload={
//   user: {
//     id: user.id,
//     role: user.role
//   }
// }

// jwt.sign(payload, SECRET_KEY, {expiresIn: 36000}, (err, token) => {
  
//     if (err) throw err;
//     res.json({token});
//     // res.json({accountType}); //change here
  
// });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({msg: [{msg: 'Server Error'}]})

//   }
// })


// user Profile API

// router.get('/user/profile', auth, async (req,res) => {
//   try {
// const user = await users.findById(req.user.id).select('-password');
// // res.status(200).json({user, msg: [{msg: 'User Data'}]})
// res.json(user);
//   }catch (error) {
//     console.log(error);
//     res.status(500).json({msg: [{msg: 'Server Error'}]})


//   }
// });

// forgot users password api

router.post('/forgot/password', async(req, res) => {
  try {
    crypto.randomBytes(32,(error,buffer) => {
      if (error) {
        console.log(error.message);
      } 
        const token = buffer.toString('hex')
        users.findOne({email:req.body.email}).then(user => {
          if (!user) {
            return res.status(400).json({msg: [{msg: 'please enter valid registered email'}]})
          }
          user.resetToken = token;
          user.expireToken= Date.now() + 3600000
          user.save().then((result) => {
            transporter.sendMail({
              from: 'no-reply@gmail.com',
              to: user.email,
              subject: 'Reset Password',
              html: `<a href="http://127.0.0.1:3000/new/password/${token}">To Reset Password</a>`

            }, (error, info) => {
              if (error) {
                console.log(error);
                return res.json(error);
              } else {
                return res.json({msg: [{msg:'Please check your Registered Email'}]});
              }
            })
           
          })
        })
      
    })
  } catch (error) {
    console.log(error);
    res.status(400).send('Server Error')
  }
})

//api for reset new password
router.post('/new/password', async (req,res) => {
  if(!req.body.password) {
    return res.status(400).json({msg: [{msg: 'Password is required'}]})
  }
  const newPassword = req.body.password;
  const sendToken = req.body.token;
  users.findOne({resetToken: sendToken, expireToken: {$gt: Date.now()}}).then(user => {
    if(!user) {
      return res.status(400).json({msg: [{msg: 'Try again sesssion expired'}]});

    }
    bcrypt.hash(newPassword, 12).then(hashedpassword => {
      user.password=hashedpassword,
      user.resetToken=undefined,
      user.expireToken=undefined,
      user.save().then((saveUser) => {
        res.json({msg: [{msg: 'Password Changed'}]});
      })
    })
  })
})


// const router = require("express").Router();
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
  
  
  
} = require("../utils/auth");


// const storage = multer.diskStorage({
//   destination: './public/images',
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// Register a new user
// router.post('/register', upload.single('avatar'), async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new users({
//       username: username,
//       password: hashedPassword,
//       avatar: req.file.filename // Assuming the field name in the form is 'profilePic'
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred while registering the user' });
//   }
// });

// router.post('/create-profile',uploader.single("avatar"),
//  async(req,res)=>{
//   try {
//     console.log(req.body);
//     console.log(req.file);
//     return res.status(201).json({
//       message: "uploading"
//   })

//   } 
 
//     catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       message:"NAN"
//     })
//     }
  
//  })
// Student Registeration Route
router.post("/register-student", async (req, res) => {
  
  await userRegister(req.body, "student", res);
});

// Warden Registration Route
router.post("/register-warden", async (req, res) => {
  await userRegister(req.body, "warden", res);
  
});

// Staff Registration Route
router.post("/register-staff", async (req, res) => {
  await userRegister(req.body, "staff", res);
});

// Student Login Route
router.post("/login-student", async (req, res) => {
  await userLogin(req.body, "student", res);
});

// Warden Login Route
router.post("/login-warden", async (req, res) => {
  await userLogin(req.body, "warden", res);
});

// Staff Login Route
router.post("/login-staff", async (req, res) => {
  await userLogin(req.body, "staff", res);
});

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});

// Users Protected Route
router.get(
  "/user-protectd",
  userAuth,
  checkRole(["student"]),
  async (req, res) => {
    return res.json("Hello User");
  }
);

// Admin Protected Route
router.get(
  "/admin-protectd",
  userAuth,
  checkRole(["warden"]),
  async (req, res) => {
    return res.json("Hello Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-protectd",
  userAuth,
  checkRole(["staff"]),
  async (req, res) => {
    return res.json("Hello Super Admin");
  }
);

// Super Admin Protected Route
router.get(
  "/super-admin-and-admin-protectd",
  userAuth,
  checkRole(["superadmin", "admin"]),
  async (req, res) => {
    return res.json("Super admin and Admin");
  }
);

module.exports = router;


