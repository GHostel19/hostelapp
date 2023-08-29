var express = require('express');
var router = express.Router();
const attendance = require('../models/attendance');
const {check, validationResult} = require('express-validator');
const auth = require('../middlewares/auth');
const users = require('../models/users');
const { userAuth } = require('../utils/auth');


/* This is for users reportedmoves posts */
router.post(
  '/create/markattendance',
  userAuth,
  [
    check('latitude', 'Latitude is required').not().isEmpty(),
    check('longitude', 'Longitude is required').not().isEmpty(),
    // check('altitude', 'Altitude is required').not().isEmpty(),
    // check('address', 'Address is required').not().isEmpty(),
  ],
  
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    // Check if the current time is between 8 PM and 11 PM
    const currentTime = new Date();
    // if (currentTime.getHours() >= 23 || currentTime.getHours() <= 9) {
      if (currentTime.getHours() >= 3 && currentTime.getHours() <= 5) {
      return res.status(403).json({ msg: 'Attendance can only be marked between 8 PM and 11 PM.' });
    }

    try {
      const user = await users.findById(req.user.id).select('-password');
      const { latitude, longitude, altitude, address } = req.body;
      const newAttendance = new attendance({
        latitude,
        longitude,
        altitude,
        address,
        username: user.username,
        name: user.name,
        regNo: user.regNo,
        branch: user.branch,
        roomNumber: user.roomNumber,
        user: req.user.id,

        attendance_markedBy: req.user.id,
      });
      await newAttendance.save();
      return res.status(200).json({ msg: 'Attendance Marked Successful' });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json('Server Error!');
    }
  }
);


router.post('/submitAttendance', async (req, res) => {
  const { latitude, longitude, address } = req.body;
  const currentTime = new Date();

  if (currentTime.getHours() >= 20 && currentTime.getHours() <= 2) {
    const attendance = new attendance({
    
      latitude,
      longitude,
      address,
      timestamp: currentTime,
    });

    try {
      await attendance.save();
      res.status(201).send('Attendance submitted successfully.');
    } catch (err) {
      res.status(500).send('Error submitting attendance.');
    }
  } else {
    res.status(403).send('Attendance can only be submitted between 8 PM and 11 PM.');
  }
});
//this is for Post(attendance) Get by ID(you've to require id there)
router.get('/attendance/:id', async(req, res) => {
  try {
    const post = await attendance.findById(req.params.id);
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/) && !post) {      //something here doesnt match so i add && instead of ||
      return res.status(404).json({msg: [{msg: 'Post not Found'}]})

    }
    res.status(200).json(post)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
    
  }
})

//this is for  Get all posts of attendance (this is for warden) 
router.get('/all/attendance', async (req, res) => {
  try {
    const allattend = await attendance.find();
    res.status(200).json(allattend)
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error')
  }
})

//api for get all posts(reportmoves/attendences) of current login user (this is for student)
router.get('/myattend/user',userAuth, async (req,res) => {   //auth makes this private
  try {
    await attendance.find({attendance_markedBy: req.user.id}).populate('attendance_markedBy', 'latitude longitude altitude address').then(respost => {
         res.status(200).json(respost)
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error')
    
  }
})

router.delete('/atte/:id', async (req, res) => {
  try {
    const deletedRecord = await attendance.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    return res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})

module.exports = router;