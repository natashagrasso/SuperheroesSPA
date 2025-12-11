//aca defino q campos tiene un superheroe

const mongoose = require('mongoose')
const { Schema, model } = mongoose

const schema = new Schema({
  nombre: String,
  nombre_pers: String,
  biografia: String,
  año_aparicion: String,
  casa: String,
  equipamiento: String,
  images: String,
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Personaje = model('Personaje', schema)

module.exports = Personaje
