import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  points: {
    type: Number,
    default: 0,
  },
  // add any additional fields here
});

// Check if the model already exists. If it does, reuse it; if not, compile a new one.
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
