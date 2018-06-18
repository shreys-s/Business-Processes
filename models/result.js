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
  }
});

const Result = module.exports = mongoose.model('Result', ResultSchema);
