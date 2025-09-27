const Tipo = require('../models/tipo')
const { request, response } = require('express')

const createTipo = async (req = request, res = response) => {
    try {
        const { nombre, descripcion } = req.body

        const datos = {
            nombre,
            descripcion
        }

        const nuevoTipo = new Tipo(datos)
        await nuevoTipo.save()

        return res.status(201).json(nuevoTipo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getTipos = async (req = request, res = response) => {
    try {
        const tipos = await Tipo.find()
        return res.json(tipos)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getTipoById = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const tipo = await Tipo.findById(id)
        if (!tipo) {
            return res.status(404).json({ msj: 'Tipo no encontrado' })
        }
        return res.json(tipo)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const updateTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre, descripcion } = req.body

        const tipoBD = await Tipo.findById(id)
        if (!tipoBD) {
            return res.status(404).json({ msj: 'Tipo no encontrado' })
        }

        const datosActualizar = {
            fechaActualizacion: new Date()
        }
        if (typeof nombre !== 'undefined') datosActualizar.nombre = nombre
        if (typeof descripcion !== 'undefined') datosActualizar.descripcion = descripcion

        const tipoActualizado = await Tipo.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        )

        return res.json(tipoActualizado)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const deleteTipo = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const tipoEliminado = await Tipo.findByIdAndDelete(id)
        if (!tipoEliminado) {
            return res.status(404).json({ msj: 'Tipo no encontrado' })
        }
        return res.json(tipoEliminado)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

module.exports = {
    createTipo,
    getTipos,
    getTipoById,
    updateTipo,
    deleteTipo
}
