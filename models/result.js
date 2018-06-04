var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ResultSchema = new Schema({
  date: {
      type: Date,
      required: true,
      default: new Date()
  },
  user_id: {
      type: ObjectId,
      required: true,
      ref: 'User'
  },
  question_id: {
      type: ObjectId,
      required: true
  },
  choice_id: {
      type: Number,
      required: true,
      default: -1
  },
  question: {
      type: ObjectId,
      ref: 'Article'
  }
});
ResultSchema.index({
    date: 1
});
var Result = mongoose.model('Result', ResultSchema);
module.exports = {
    mongoose: mongoose,
    Result: Result
}