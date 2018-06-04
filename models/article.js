const mongoose = require('mongoose');
// Article Schema
const ArticleSchema = mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  choice1:{
    type: String,
    required: true
  },
  choice2:{
    type: String,
    required: true
  },
  choice3:{
    type: String,
    required: true
  },
  weight:{
    type: Number,
    required: true
  }
});



const Article = module.exports = mongoose.model('Article', ArticleSchema);
