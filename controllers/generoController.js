const Genero = require('../models/genero')
const {request, response} = require('express')

const createGenero = async (req = request, res = response) => {

    try {
        const { nombre, descripcion } = req.body

        const datos = { nombre, descripcion }
        const nuevoGenero = new Genero(datos)
        await nuevoGenero.save()

        res.status(201).json(nuevoGenero)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}  

const getGeneros = async (req = request, res = response) => {
    try {
        const generos = await Genero.find()
        return res.json(generos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getGeneroById = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const genero = await Genero.findById(id)
        if (!genero) {
            return res.status(404).json({ msj: 'Género no encontrado' })
        }
        return res.json(genero)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const updateGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre, descripcion, estado } = req.body

        const generoBD = await Genero.findById(id)
        if (!generoBD) {
            return res.status(404).json({ msj: 'Género no encontrado' })
        }

        // La unicidad de nombre se valida en el middleware previo a esta acción

        const datosActualizar = {
            fechaActualizacion: new Date()
        }
        if (typeof nombre !== 'undefined') datosActualizar.nombre = nombre
        if (typeof descripcion !== 'undefined') datosActualizar.descripcion = descripcion
        if (typeof estado !== 'undefined') datosActualizar.estado = estado

        const generoActualizado = await Genero.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        )

        return res.json(generoActualizado)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const deleteGenero = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const generoEliminado = await Genero.findByIdAndDelete(id)
        if (!generoEliminado) {
            return res.status(404).json({ msj: 'Género no encontrado' })
        }
        return res.json(generoEliminado)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}   

module.exports = {
    createGenero,
    getGeneros,
    getGeneroById,
    updateGenero,
    deleteGenero
}   