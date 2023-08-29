// model.js
const mongoose = require('mongoose');

// Define the student schema and model
const studentSchema = new mongoose.Schema({
  name: String,
  semester: Number,
  grade: String,
  allocatedRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'Roomn' },
});

const Student = mongoose.model('Student', studentSchema);

// Define the room schema and model
const roomnSchema = new mongoose.Schema({
  roomno: String,
  occupancy: Number,
  occupied: Boolean,
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Room = mongoose.model('Roomn', roomnSchema);

module.exports = { Student, Room };
