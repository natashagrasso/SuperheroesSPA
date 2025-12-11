//Conecta la base de datos y define las rutas (endpoints) que usará el Frontend.
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// Importamos los controladores del modelo aprobado
const {
  getAllPersonajes,
  getPersonajeDc,
  getPersonajeMarvel,
  getPersonajesId,
  createPersonaje,
  updatePersonaje,
  deletePersonaje,
} = require('./controllers/personajeController')

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// --- CONEXIÓN A BASE DE DATOS ---
// Usamos 'mongodb' como host porque estamos dentro de Docker
const URL = 'mongodb://mongodb:27017/superheroes'

mongoose
  .connect(URL)
  .then(() => {
    console.log('Conexión exitosa a MongoDB')
  })
  .catch(error => {
    console.error('Error al conectar a MongoDB:', error)
  })

// --- RUTAS DEFINIDAS EN EL MODELO ---

app.get('/superheroes', getAllPersonajes)
app.get('/marvel', getPersonajeMarvel)
app.get('/dc', getPersonajeDc)
app.get('/superheroe/:id', getPersonajesId)
app.post('/add', createPersonaje)
app.put('/edit/:id', updatePersonaje)
app.delete('/delete/:id', deletePersonaje)

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
