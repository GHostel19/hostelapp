const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const AttendanceSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
     
    user: {
        type: ObjectId,
        ref: 'users'
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    altitude: {
        type: String
    },
    address: {
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
    attendance_markedBy: {
        type: ObjectId,
        ref: 'users'
    }
    
})

module.exports = Attendance = mongoose.model('attendance', AttendanceSchema);