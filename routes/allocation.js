const express = require('express');
const studata = require('../models/studata');
var room = require('../models/room');
const { Student, Room } = require('../models/allots');
const router = express.Router();
// const csv = require("csvtojson");
// const multer = require('multer');
// const path = require('path');
// const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');

const allocateController = require('../controllers/allocateController');
router.get('/allocated',allocateController.allocate);

router.get('/allot', async (req, res) => {
    try {
      const alloted = await room.aggregate([
        {
            $lookup: {
              from: 'studatas',
              localField: 'roomno',
              foreignField: 'paymentid',
              as: 'Allocation'
            }
          }
        // {$unionWith: "studatas"},
        // {$project: {name: "$name", paymentid: "$paymentid", roomno: "$roomno", roomtype: "$roomtype"}},
        // { $sort: { paymentid:1, roomtype:1, roomno:-1}}
       ]);
      res.status(200).json(alloted)
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error')
    }
  })

 

// API endpoint to allocate a room
router.post('/allocate', async (req, res) => {
  const { studentId, occupancy } = req.body;
  // studentId: req.student.id

  try {
    const student = await Student.findById(studentId);
    if (!student) {
      res.status(404).json({ message: 'Student not found' });
      return;
    }

    if (student.allocatedRoom) {
      res.status(400).json({ message: `Student ${studentId} already allocated a room` });
      return;
    }

    let room;
    if (occupancy === 1) {
      room = await Room.findOne({ occupancy: 1, occupied: false });
    } else if (occupancy === 3) {
      room = await Room.findOne({ occupancy: 3, occupied: false });
    } else {
      res.status(400).json({ message: 'Invalid occupancy value. Only 1 or 3 is allowed.' });
      return;
    }

    if (!room) {
      res.status(404).json({ message: `No ${occupancy === 1 ? 'single' : 'three'} occupancy room available` });
    } else {
      if (occupancy === 1) {
        room.occupied = true;
      } else {
        if (room.occupants.length === 3) {
          res.status(400).json({ message: 'The three occupancy room is already full' });
          return;
        }
        room.occupants.push(student._id); // Use _id as the student identifier
        if (room.occupants.length === 3) {
          room.occupied = true;
        }
      }
      student.allocatedRoom = room._id; // Use _id as the room identifier
      await student.save();
      await room.save();
      res.json({ message: `Room ${room._id} allocated to student ${student._id}` });
    }
  } catch (error) {
    console.error('Error allocating room:', error);
    res.status(500).json({ message: 'An error occurred while allocating the room' });
  }
});

router.get('/allocated-students', async (req, res) => {
  try {
    const allocatedStudents = await Student.find({ allocatedRoom: { $ne: null } }).populate('allocatedRoom');
    res.json(allocatedStudents);
  } catch (error) {
    console.error('Error fetching allocated students:', error);
    res.status(500).json({ message: 'An error occurred while fetching allocated students' });
  }
});
module.exports = router;
