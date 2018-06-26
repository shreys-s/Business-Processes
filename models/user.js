const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  company:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  isAdmin:{
  	type: Boolean,
  	default: false
  },
  p2p:{
    purchasesection:{
      type: Number,
      default:0
    },
    vendoranalysis:{
      type: Number,
      default:0
    },
    erpsection:{
      type:Number,
      default:0
    },
    finances:{
      type:Number,
      default:0
    },
    score:{
      type:Number,
      default:0
    }
  }
});

const User = module.exports = mongoose.model('User', UserSchema);
