const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    role: {
        type: String,
        default: "student",
        enum: ["student", "warden", "staff"]
    },
    name: {
        type: String
    },
      designation: {
        type: String
    },
    avatar: {
        type: String,
        required: false,
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
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    resetToken: String,
    expireToken: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true})

module.exports = User = mongoose.model('users', UserSchema);