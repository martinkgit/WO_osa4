const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = mongoose.Schema({
  username: {
      type: String,
      unique: true,
      required: true,
      minlength: 3
  },
  name: String,
  passwordHash:{
    type: String,
    required: true,
    minlength: 3
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})


const User = mongoose.model('User', userSchema)

//userSchema.plugin(uniqueValidator) Tämä aiheutti errorin UnhandledPromiseRejectionWarning: ValidationError: User validation failed: _id: Error, expected `_id` to be unique. Value: `61d6d5dd17beba23227abe9b`

module.exports = User