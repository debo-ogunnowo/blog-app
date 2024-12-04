const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function () {
  const user = this;
  if (user.isModified('password') || user.isNew){
    try {
      const hash = await bcrypt.hash(user.password, 10);
      user.password = hash;
    } catch (error) {
      console.error(error);
    }
  }
})

module.exports = mongoose.model('User', userSchema);