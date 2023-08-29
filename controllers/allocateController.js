var studata = require('../models/studata');
var room = require('../models/room');
const allocate = async (req,res)=> {
    try {
       var automation = await room.aggregate([
        {$unionWith: "studatas"},
        {$project: {name: "$name", paymentid: "$paymentid", roomno: "$roomno", roomtype: "$roomtype"}},
        { $sort: { paymentid:1, roomtype:1, roomno:-1}}
       ]);


       res.status(200).send({data:automation}) 
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    allocate
}