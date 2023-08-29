const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const QuerySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    complains: {
        type: String
    },
    textarea: {
        type: String
    },
    username: {
        type: String
    },
    query_reportBy: {
        type: ObjectId,
        ref: 'users'
    },
    comments: [
        {
        user: {
            type: ObjectId,
            ref: 'users'
        },
        comment: {
            type: String
        },
        name: {
            type: String
        }
    }
    ]
    
    
    
    
},
{timestamps: true}
)

module.exports = Queries = mongoose.model('queries', QuerySchema);