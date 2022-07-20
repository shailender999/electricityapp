const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let electricitySchema = new Schema({
  id: {
    type: String
  },
  billdate: {
    type: String
  },
  rollno: {
    type: Number
  }
}, {
    collection: 'students'
  })

module.exports = mongoose.model('Student', studentSchema)