const mongoose = require('mongoose');
// const {ObjectId} = mongoose.Schema.Types;
const RoomSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    roomno: {
        type: String
    },
    roomtype: {
        type: String
    }
//     roomtype: [
//         {
//         single: {
//             type: String
            
//         },
//         triple: [{
//             A: {
//                 type: String
//             },
//             B: {
//                 type: String
//             },
//             C: {
//                 type: String
//             }
//         }]
//     }
// ]
    
    
    
})

module.exports = Room = mongoose.model('room', RoomSchema);