const express = require('express');
// const studata = require('../models/prevstudents');
const prevstudents = require('../models/prevstudents');
const userController = require('../controllers/userController');
const router = express.Router();

// router.post(
//   "/stu/create",
//   upload.single('file'),
//   userController.stucreate
// )

router.get('/all/prevstudents', async (req, res) => {
    try {
      const allstu = await prevstudents.find().sort({semester:-1, grade:-1});
      res.status(200).json(allstu)
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error')
    }
  })



  router.post("/stud", async (req, res) => {
    try {
      const data = new prevstudents(req.body);
      const result = await data.save();
  
      if (!result) {
        res.json({
          status: "failed",
          message: "failed to add student",
          data: result
        });
      } else {
        // Re-fetch all students after adding a new student
        const allstu = await prevstudents.find().sort({ semester: -1, grade: -1 });
  
        res.json({
          status: "success",
          message: "student added successfully",
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
router.get('/stud/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const student = await prevstudents.findById(_id);

    if (!student) {
      res.status(404).json({
        status: "FAILED",
        message: "Student not found",
        data: null
      });
    } else {
      res.json({
        status: "success",
        message: "Student details retrieved successfully",
        data: student
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
router.put('/stud/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const result = await prevstudents.findByIdAndUpdate(_id, req.body, { new: true });

    if (!result) {
      res.json({
        status: "FAILED",
        message: "updation fail",
        data: result
      });
    } else {
      // Re-fetch all students after updating the specific student
      const allstu = await prevstudents.find().sort({ semester: -1, grade: -1 });

      res.json({
        status: "success",
        message: "updated successfully",
        data: allstu
      });
    }
  } catch (e) {
    res.send(e);
  }
});


//delete students record
router.delete('/all/stud/:id', async (req,res) => {
  try {
    const _id = req.params.id;
    const result = await prevstudents.findByIdAndDelete(_id);
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