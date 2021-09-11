const mongoose = require('mongoose')
const uniqueMongoose = require('mongoose-unique-validator')

const murl = process.env.MONGODB_URI

console.log('connecting to', murl)
mongoose.connect(murl)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type:String, required: true}
})

personSchema.plugin(uniqueMongoose)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)