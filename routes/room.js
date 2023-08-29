const express = require('express');
const room = require('../models/room');
const router = express.Router();
const fs = require("fs");
const csvtojson = require("csvtojson");
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const userController = require('../controllers/userController');
// router.get('/exportRooms',userController.exportRooms); 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if(!fs.existsSync("public")) {
      fs.mkdirSync("public")
    }
    if(!fs.existsSync("public/csv")) {
      fs.mkdirSync("public/csv")
    }
    cb(null, "public/csv")
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() = file.originalname);
  },
})

const upload = multer({
  storage: storage,
  fileFilter: function(req,file,cb) {
    var ext = path.extname(file.originalname);
    if(ext != ".csv") {
      return cb (new Error("only csvs are allowed"));
    }
    cb(null, true)
  },
});
router.post(
  "/stu/create",
  upload.single('file'),
  userController.stucreate
)

router.post(
  "/create",
  upload.single('file'),
  userController.roomcreate
)
router.get('/all/rooms', async (req, res) => {
    try {
      const allroom = await room.find().sort({roomtype:1, roomno:-1});
      res.status(200).json(allroom)
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error')
    }
  })

  router.post("/room", async (req, res) => {
    try {
      const data = new room(req.body);
      const result = await data.save();
  
      if (!result) {
        res.json({
          status: "failed",
          message: "failed to add room",
          data: result
        });
      } else {
        // Re-fetch all students after adding a new student
        const allstu = await room.find().sort({ roomtype: 1, roomno: -1 });
  
        res.json({
          status: "success",
          message: "room added successfully",
          data: allstu
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        error: error.message
      });
    }
  });
  
 

// Get student details by ID
router.get('/room/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const nroom = await room.findById(_id);

    if (!nroom) {
      res.status(404).json({
        status: "FAILED",
        message: "Room not found",
        data: null
      });
    } else {
      res.json({
        status: "success",
        message: "Room details retrieved successfully",
        data: nroom
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message
    });
  }
});
//update table of student data
router.put('/room/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await room.findByIdAndUpdate(_id, req.body, { new: true });

    if (!result) {
      res.json({
        status: "FAILED",
        message: "updation fail",
        data: result
      });
    } else {
      // Re-fetch all students after updating the specific student
      const rooms = await room.find().sort({ roomtype: 1, roomno: -1 });

      res.json({
        status: "success",
        message: "updated successfully",
        data: rooms
      });
    }
  } catch (e) {
    res.send(e);
  }
});


//delete students record
router.delete('/all/room/:id', async (req,res) => {
  try {
    const _id = req.params.id;
    const result = await room.findByIdAndDelete(_id);
    if(!result) {
      res.json({
        status: "failed",
        message: "failed to delete"
      })
    }
    else {
      res.json ({
        status: "success",
        message: "deleted sucessfully"
      })
    }
  } catch (e) {
    res.send(e)
  }
})
module.exports = router;