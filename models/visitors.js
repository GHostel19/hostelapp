const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
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
    visitor_name: {
        type: String
    },
    relation: {
        type: String
    },
    stayduration: {
        type: String
    },
   
    phoneNo: {
        type: Number
    }
    
    
    
})

module.exports = Visitors = mongoose.model('visitors', VisitorSchema);