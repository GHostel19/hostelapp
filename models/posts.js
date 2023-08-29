const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const PostSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: ObjectId,
        ref: 'users'
    },
    reason: {
        type: String
    },
    activity: {
        type: String
    },
    location: {
        type: String
    },
    name: {
        type: String
    },
    regNo: {
        type: String
    },
    branch: {
        type: String
    },
    roomNumber: {
        type: String
    },
    phoneNo: {
        type: String
    },
    moves_reportBy: {
        type: ObjectId,
        ref: 'users'
    }
    
    
})

module.exports = Posts = mongoose.model('posts', PostSchema);