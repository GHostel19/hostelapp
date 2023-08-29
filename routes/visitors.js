// var express = require('express');
// var router = express.Router();
// const posts = require('../models/visitors');
// const {check, validationResult} = require('express-validator');
// const auth = require('../middlewares/auth');
// const users = require('../models/users');
// const visitors = require('../models/visitors');
// const { userAuth, checkRole } = require('../utils/auth');



// /* This is for users reportedmoves posts */
// router.post('/create/visitrecords', 
//     [
// check('student_name', 'Name is required').not().isEmpty(),
// check('regNo', 'Registration No is required').not().isEmpty(),
// check('branch', 'Branch is required').not().isEmpty(),
// check('visitor_name', 'Visitor name is required').not().isEmpty(),
// check('relation', 'Relation is required').not().isEmpty(),
// check('stayduration', 'Duration of stay is required').not().isEmpty(),
// check('phoneNo', 'Phone Number is required').not().isEmpty(),
// check('roomNo', 'Room Number is required').not().isEmpty(),
//     ],
//     userAuth,
//     // checkRole(["staff"]),
//  async(req, res, next) => {
//     console.log(req.body);
//   const errors=validationResult(req);
//   if(!errors.isEmpty()) {
//     return res.status(400).json({msg: errors.array()});
//   }
//   try {
//        const user = await users.findById(req.user.id).select('-password');
//        const {student_name, regNo, branch, roomNo, visitor_name, relation, stayduration, phoneNo} = req.body;
//        const newVisitor =new visitors({
//         student_name, 
//         regNo, 
//         branch,
//         roomNo, 
//         visitor_name, 
//         relation, 
//         stayduration, 
//         phoneNo,
        
//         username: user.username,
        
//        });
//        await newVisitor.save().then(resVisitor => {
//         return res.status(200).json({resVisitor, msg: [{msg: 'Visitors Record mentioned successfully'}]})
//        })
//   } catch(error) {

//     console.log(error.message);
//     return res.status(500).json('Server Error!')
//   }
// });

// //this is for  Get all posts of reportmoves 
// router.get('/all/visitrecords', async (req, res) => {
//     try {
//       const allvisitor = await visitors.find();
//       res.status(200).json(allvisitor)
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).json('Server Error')
//     }
//   })

//   module.exports = router;

const express = require('express');
const router = express.Router();
const posts = require('../models/visitors');
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const users = require('../models/users');
const visitors = require('../models/visitors');
const { userAuth, checkRole } = require('../utils/auth');

/* This is for users reportedmoves posts */
router.post(
  '/create/visitrecords',
  [
    // check('name', 'Name is required').not().isEmpty(),
    check('regNo', 'Registration No is required').not().isEmpty(),
    // check('branch', 'Branch is required').not().isEmpty(),
    check('visitor_name', 'Visitor name is required').not().isEmpty(),
    check('relation', 'Relation is required').not().isEmpty(),
    check('stayduration', 'Duration of stay is required').not().isEmpty(),
    // check('phoneNo', 'Phone Number is required').not().isEmpty(),
    // check('roomNumber', 'Room Number is required').not().isEmpty(),
  ],
  userAuth,
  // checkRole(["staff"]),
  async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    try {
      // Get the authenticated user's details from the database
      const user = await users.findById(req.user.id).select('-password');

      const {
        name,
        regNo,
        branch,
        roomNumber,
        visitor_name,
        relation,
        stayduration,
        phoneNo,
      } = req.body;

      // Fetch the student's details from the database based on the regNo
      const student = await users.findOne({ regNo });
      if (!student) {
        return res.status(404).json({ msg: 'Student not found' });
      }

      const newVisitor = new visitors({
        name,
        regNo,
        branch,
        roomNumber,
        visitor_name,
        relation,
        stayduration,
        phoneNo,
        // Automatically fill some of the student information
        name: student.name,
        branch: student.branch,
        roomNumber: student.roomNumber,
        phoneNo: student.phoneNo,
        // Add any other fields you want to autofill
        username: student.username,
      });

      await newVisitor.save().then((resVisitor) => {
        return res
          .status(200)
          .json({ resVisitor, msg: [{ msg: 'Visitors Record mentioned successfully' }] });
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json('Server Error!');
    }
  }
);

// Define the route to get student details based on registration number
router.get('/getStudentDetails/:regNo', async (req, res) => {
  try {
    const regNo = req.params.regNo;
    // Fetch student details from the database based on the registration number
    const student = await users.findOne({ regNo }); // Replace with your model and field names
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    // Return the student details as a response
    res.status(200).json(student);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
router.get('/all/visitrecords', async (req, res) => {
    try {
      const allvisitor = await visitors.find();
      res.status(200).json(allvisitor)
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error')
    }
  })

  router.delete('/visitrecord/:id', async (req, res) => {
    try {
      const deletedRecord = await visitors.findByIdAndDelete(req.params.id);
      if (!deletedRecord) {
        return res.status(404).json({ message: 'Record not found' });
      }
      return res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  })
module.exports =router