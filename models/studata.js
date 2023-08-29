const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Schema.Types;
const StudataSchema = new mongoose.Schema({
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
    paymentdate: {
        type: String
    },
    seq: {
        type: Number
    }
    
    
    
    
})

module.exports = Studata = mongoose.model('studata', StudataSchema);