const mongoose = require('mongoose');
// Article Schema
const ResultSchema = mongoose.Schema({
  category:{
    type: Number,
    required: true
  },
  section:{
    type: Number,
    required: true
  },
  updated: { 
    type: Date, 
    default: Date.now 
  },
  user:{
    type: String
  },
  question:{
    title:
    {
      type: String,
      required: true
    },
    weight:
    {
      type: Number,
      required:true
    }
  },
  answer:{
      type: Number,
      required:true
  }
});

const Result = module.exports = mongoose.model('Result', ResultSchema);
