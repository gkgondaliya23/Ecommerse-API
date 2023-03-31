const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required:true
  },
  username: {
    type: String, 
    required:true,
    unique:true
  },
  email: {
    type: String, 
    required:true, 
    unique:true
  },
  password: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: Number, 
    required: true 
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
  
},
{timestamps:true}
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

exports.User = mongoose.model('User', userSchema);