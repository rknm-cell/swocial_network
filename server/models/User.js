import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    default: "",
  },
  friends: {
    type: Array,
    default: [],
  },
  location: String,
  description: String,
});

const User = mongoose.model("User", UserSchema);

export default User;