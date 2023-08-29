var express = require('express');
var router = express.Router();
const queries = require('../models/queries');
const {check, validationResult} = require('express-validator');
const auth = require('../middlewares/auth');
const users = require('../models/users');
const { userAuth, checkRole } = require('../utils/auth');


/* This is for users queries posts */
router.post('/create/query', 
    [
check('complains', 'Query is required').not().isEmpty(),
check('textarea', 'TextArea is required').not().isEmpty()


    ],
    userAuth,
    // checkRole(["student"]),
 async(req, res, next) => {
    console.log(req.body);
  const errors=validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({msg: errors.array()});
  }
  try {
       const user = await users.findById(req.user.id).select('-password');
       const {complains, textarea} = req.body;
       const newQuery =new queries({
        complains,
        textarea,
        username: user.username,
        name: user.name,
        user: req.user.id,
        query_reportBy: req.user.id
       });
       await newQuery.save().then(resQuery => {
        return res.status(200).json({resQuery, msg: [{msg: 'Your Query is Reported Successfully'}]})
       })
  } catch(error) {

    console.log(error.message);
    return res.status(500).json('Server Error!')
  }
});


//this is for  Get all queries
router.get('/all/queries', async (req, res) => {
    try {
      const allquery = await queries.find();
      res.status(200).json(allquery)
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error')
    }
  })
  
  //api for get all posts(queries) of current login user
  router.get('/myquery/user',userAuth, async (req,res) => {   //auth makes this private
    try {
      await queries.find({query_reportBy: req.user.id}).populate('query_reportBy', 'complains').then(resquery => {
           res.status(200).json(resquery)
      });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json('Server Error')
      
    }
  })

  //this is for Post(reportmoves) Get by ID
router.get('/query/:id', async(req, res) => {
  try {
    const post = await queries.findById(req.params.id);
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/) && post) {      //something here doesnt match so i add && instead of ||
      return res.status(404).json({msg: [{msg: 'Query not Found'}]})

    }
    res.status(200).json(post)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
    
  }
})

  //comments on your queries
  router.post('/comment/:id',
  [
    check('comment', 'Comment is required' ).not().isEmpty(),
  ],
  userAuth,
   async (req, res) => {
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({msg: errors.array()})
    }
    try {
      const user=await users.findById(req.user.id).select('-password');
      const query=await queries.findById(req.params.id);
      const newComment={
        comment: req.body.comment,
        name: user.name,
        user: req.user.id
      }
      query.comments.unshift(newComment);
      await query.save();
      res.status(200).json({comment:query.comments, msg: [{msg: 'Response Added successfully'}]})
    } catch (error) {
      console.log(error.message);
      return res.status(500).json('Server Error')
    }
  }
  )

  // GET comments for a specific query
router.get('/response/:id',  async (req, res) => {
  try {
    const query = await queries.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ msg: 'Query not found' });
    }
    
    res.status(200).json(query.comments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Server Error');
  }
});

  //delete comment
  router.delete('/comment/:id/:comment_id', userAuth, async(req,res) => {
    try {
      const post = await queries.findById(req.params.id);
      const comment = post.comments.find(comment => comment.id === req.params.comment_id);
      if (!comment) {
return res.status(404).json({msg: [{msg: 'comment not found'}]});

      }
      if (comment.user.toString()!==req.user.id) {
        return res.status(401).json({msg: [{msg: 'user not authorized'}]})
      }
      post.comments=post.comments.filter(({id}) => id!==req.params.comment_id)
      await post.save();
      return res.status(200).json({comment: post.comments, msg: [{msg: 'Comment Deleted'}]})
    } catch (error) {
      console.log(error.message)
      res.status(500).send('Server Error')
    }
  })
  
  module.exports = router;

