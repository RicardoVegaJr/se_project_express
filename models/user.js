const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials (email, password) {
  console.log('Attempting to find user with email:', email); // Log the email
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      console.log('User found:', user.email);
      console.log('Provided password:', password); // Log the plain-text password (BE CAREFUL IN PROD)
      console.log('Stored hashed password:', user.password); // Log the stored has

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            console.log('Password mismatch for user:', user.email); // Log if password doesn't match
            return Promise.reject(new Error('Incorrect email or password'));
            console.log('Passwords matched! User authenticated:', user.email);
          }
          return user;
        });
    });
};

module.exports = mongoose.model("user", userSchema);
