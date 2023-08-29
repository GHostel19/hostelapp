// var studata = require('../models/studata');
// const fs  = require('fs');
// const csv = require('fast-csv')
// var room = require('../models/room');
// // var csv = require('csvtojson');
// const CsvParser = require('json2csv').Parser;
// const path = require('path');
// // const multer = require('multer');


// // post or upload students details
//  const create = async (req, res) => {
//     console.log(req.file);
//     const totalRecords = [];
//     try {
//         console.log(path.join(__dirname, '../', '/others/uploads/' + req.file.filename))
//         fs.createReadStream(path.join(__dirname, '../', '/others/uploads/' + req.file.filename))
//         .pipe(csv.parse({headers:true}))
//         .on('error', error => console.error(error))
//         .on('data', row => {totalRecords.push(row)})
//         .on('end', async totalRecords => {
//             console.log(`${rowCount} rows has parsed`)
//        try {
//         const users = await studata.insertMany(totalRecords);
//         res.json({
//             message: 'Users created successfully',
//             users
//         })
        

//        } catch (err) {
//         res.status(400).json(err)
//        }
//     });
//     } catch (error) {
//         res.status(400).json(error);
//     }
// };

// // const store = (req, res, next) => {
// //     if(req.file){
// //         studata.filestu = req.file.path
// //     }
// //     studata.save()
// //     .then(response => {
// //         res.json({
// //             message: 'file uploaded'
// //         })
// //     })
// //     .catch(error => {
// //         res.json({
// //             message: 'An error occurred'
// //         })
// //     })
// // }
// // const importUser = async(req, res) => {
// //     try {

// //         var stuData = [];
// //         csv()
// //         .fromFile(req.file.path)
// //         .then(async(response)=> {

// //         for(var x = 0; x<response.length; x++){
// //             stuData.push({
// //                 name: response[x].name,
// //                 paymentid: response[x].paymentid,
// //             })
// //         }
// //         await studata.insertMany(stuData);

// //         });
        
// //         res.send({status:200, success:true,msg:'csv imported'})
// //     } catch (error) {
// //         res.send({status:400, success:false,msg:error.message});
// //     }
// // }



// // get students details
// const exportUser = async(req, res)=>{
//     try {
//         let studatas = [];
//         var students=await studata.find({}).sort({paymentid:1});
//         students.forEach((studata) => {
//             const {id, name, paymentid} = studata
//             studatas.push({id,name, paymentid});


//         });
//         const csvFields = ['Id','Name', 'PaymentID'];
//         const csvParser=new CsvParser({csvFields});
//         const csvData=csvParser.parse(studatas);
//         // res.setHeader("Content-Type","text/csv");
//         // res.setHeader("Content-Disposition","attachment: filename=studsdata.csv");
//         res.status(200).end(csvData);
//     } catch (error) {
//         res.send({status:400, success:false,msg:error.message});
//     }
// }

// // get room  details
// const exportRooms = async(req, res)=>{
//     try {
//         let rooms = [];
//         var roomData=await room.find({}).sort({roomtype:1, roomno:-1});
//         roomData.forEach((room) => {
//             const {id, roomno, roomtype} = room
//             rooms.push({id,roomno, roomtype});


//         });
//         const csvRFields = ['id','RoomNo', 'roomType'];
//         const csvParser=new CsvParser({csvRFields});
//         const csvRData=csvParser.parse(rooms);
//         // res.setHeader("Content-Type","text/csv");
//         // res.setHeader("Content-Disposition","attachment: filename=roomsdata.csv");
//         res.status(200).end(csvRData);
//     } catch (error) {
//         res.send({status:400, success:false,msg:error.message});
//     }
// }


// module.exports = {
//     // importUser,
//     exportUser, 
//     create,
//     exportRooms
// }

const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Room = require("../models/room");
const prevstudents = require("../models/prevstudents");

exports.roomcreate = async (req, res) => {
  console.log(req.file);
  const totalRecords = [];
try{
console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
  fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => totalRecords.push(row))
    .on('end', async rowCount => {
      try{
        const users = await Room.insertMany(totalRecords);
        
        res.json(users);
      }catch(err){
        res.status(400).json(err);
      }
    });

  }catch(error){
    res.status(400).json(error)
  }
};

exports.stucreate = async (req, res) => {
    console.log(req.file);
    const totalRecords = [];
  try{
  console.log(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
    fs.createReadStream(path.join(__dirname, '../', '/public/csv/' + req.file.filename))
      .pipe(csv.parse({ headers: true }))
      .on('error', error => console.error(error))
      .on('data', row => totalRecords.push(row))
      .on('end', async rowCount => {
        try{
          const users = await prevstudents.insertMany(totalRecords);
          
          res.json(users);
        }catch(err){
          res.status(400).json(err);
        }
      });
  
    }catch(error){
      res.status(400).json(error)
    }
  };