// CORRECCIÓN: Agregamos "/schema" al final para apuntar al archivo exacto
const Personaje = require('../schema/schema')

// 1. Obtener TODOS
const getAllPersonajes = async (req, res) => {
  try {
    const personajes = await Personaje.find({})
    res.json(personajes)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener personajes' })
  }
}

// 2. Obtener MARVEL
const getPersonajeMarvel = async (req, res) => {
  try {
    const personajes = await Personaje.find({
      casa: { $regex: new RegExp('^marvel$', 'i') },
    })
    res.json(personajes)
  } catch (error) {
    res.status(500).json({ error: 'Error buscando Marvel' })
  }
}

// 3. Obtener DC
const getPersonajeDc = async (req, res) => {
  try {
    const personajes = await Personaje.find({
      casa: { $regex: new RegExp('^dc$', 'i') },
    })
    res.json(personajes)
  } catch (error) {
    res.status(500).json({ error: 'Error buscando DC' })
  }
}

// 4. Obtener por ID
const getPersonajesId = async (req, res) => {
  try {
    const personaje = await Personaje.findById(req.params.id)
    if (personaje) {
      res.json(personaje)
    } else {
      res.status(404).json({ error: 'Personaje no encontrado' })
    }
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' })
  }
}

// 5. Crear Personaje
const createPersonaje = async (req, res) => {
  const {
    nombre,
    nombre_pers,
    biografia,
    año_aparicion,
    casa,
    equipamiento,
    images,
  } = req.body

  try {
    const newPersonaje = new Personaje({
      nombre,
      nombre_pers,
      biografia,
      año_aparicion,
      casa,
      equipamiento,
      images,
    })

    await newPersonaje.save()
    res.status(201).json(newPersonaje)
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar personaje' })
  }
}

// 6. Editar Personaje
const updatePersonaje = async (req, res) => {
  try {
    const actualizado = await Personaje.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    )
    res.json(actualizado)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' })
  }
}

// 7. Eliminar Personaje
const deletePersonaje = async (req, res) => {
  try {
    await Personaje.findByIdAndDelete(req.params.id)
    res.json({ message: 'Eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar' })
  }
}

module.exports = {
  getAllPersonajes,
  getPersonajeDc,
  getPersonajeMarvel,
  getPersonajesId,
  createPersonaje,
  updatePersonaje,
  deletePersonaje,
}
