const mongoose = require('mongoose');

const docketSchema = new mongoose.Schema({
  name: String,
  startTime: String,
  endTime: String,
  hourWork:Number,
  hourRate:Number,
  supplierName:String,
  PONumber:String,
  description:String
});

const User = mongoose.model('User', docketSchema);

module.exports = User;