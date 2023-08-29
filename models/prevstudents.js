const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Schema.Types;
const PrevstudentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String
    },
    rollno: {
        type: String
    },
    semester: {
        type: String
    },
    grade: {
        type: String
    },
    seq: {
        type: Number
    },
    filestu: {
        type: String
    }
    }, {timestamps: true})
    
    
    
    
    


module.exports = prevstudents = mongoose.model('prevstudents', PrevstudentSchema);