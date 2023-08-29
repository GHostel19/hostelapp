var express = require('express');
var router = express.Router();
const posts = require('../models/posts');
const {check, validationResult} = require('express-validator');
const auth = require('../middlewares/auth');
const users = require('../models/users');
const { userAuth } = require('../utils/auth');


/* This is for users reportedmoves posts */
router.post('/create/movespost', 
    [
check('reason', 'Reason is required').not().isEmpty(),
check('activity', 'Activity is required').not().isEmpty(),
check('location', 'location is required').not().isEmpty(),
    ],
    userAuth
, async(req, res, next) => {
    console.log(req.body);
  const errors=validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({msg: errors.array()});
  }
  try {
       const user = await users.findById(req.user.id).select('-password');
       const {reason, activity, location} = req.body;
       const newPost =new posts({
        reason, 
        activity, 
        location,
        username: user.username,
        name: user.name,
        regNo: user.regNo,
        branch: user.branch,
        roomNumber: user.roomNumber,
        phoneNo: user.phoneNo,
        user: req.user.id,
        moves_reportBy: req.user.id
       });
       await newPost.save().then(resPost => {
        return res.status(200).json({resPost, msg: [{msg: 'Your Moves Reported Successfully'}]})
       })
  } catch(error) {

    console.log(error.message);
    return res.status(500).json('Server Error!')
  }
});


//this is for Post(reportmoves) Get by ID
router.get('/post/:id', async(req, res) => {
  try {
    const post = await posts.findById(req.params.id);
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/) && !post) {      //something here doesnt match so i add && instead of ||
      return res.status(404).json({msg: [{msg: 'Post not Found'}]})

    }
    res.status(200).json(post)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
    
  }
})

//this is for  Get all posts of reportmoves 
router.get('/all/posts', async (req, res) => {
  try {
    const allpost = await posts.find();
    res.status(200).json(allpost)
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error')
  }
})

//api for get all posts(reportmoves/attendences) of current login user
router.get('/mypost/user',userAuth, async (req,res) => {   //auth makes this private
  try {
    await posts.find({moves_reportBy: req.user.id}).populate('moves_reportBy', 'reason activity location').then(respost => {
         res.status(200).json(respost)
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error')
    
  }
})

router.delete('/posts/:id', async (req, res) => {
  try {
    const deletedRecord = await posts.findByIdAndDelete(req.params.id);
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