const Productora = require('../models/productora')
const { request, response } = require('express')

const createProductora = async (req = request, res = response) => {
    try {
        const { nombre, slogan, descripcion } = req.body

        const datos = {
            nombre,
            slogan,
            descripcion
            // estado se establece automáticamente como true por defecto en el modelo
        }

        const nuevaProductora = new Productora(datos)
        await nuevaProductora.save()

        return res.status(201).json(nuevaProductora)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getProductoras = async (req = request, res = response) => {
    try {
        const productoras = await Productora.find()
        return res.json(productoras)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getProductoraById = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const productora = await Productora.findById(id)
        if (!productora) {
            return res.status(404).json({ msj: 'Productora no encontrada' })
        }
        return res.json(productora)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getProductorasByEstado = async (req = request, res = response) => {
    try {
        let { estado } = req.query
        if (typeof estado === 'undefined' && req.params && typeof req.params.estado !== 'undefined') {
            estado = req.params.estado
        }

        if (typeof estado === 'undefined') {
            return res.status(400).json({ msj: 'Debe proveer el estado' })
        }

        if (typeof estado === 'string') {
            estado = estado.toLowerCase() === 'true'
        }

        const productoras = await Productora.find({ estado })
        return res.json(productoras)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const updateProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { nombre, slogan, descripcion, estado } = req.body

        const productoraBD = await Productora.findById(id)
        if (!productoraBD) {
            return res.status(404).json({ msj: 'Productora no encontrada' })
        }

        const datosActualizar = {
            fechaActualizacion: new Date()
        }
        if (typeof nombre !== 'undefined') datosActualizar.nombre = nombre
        if (typeof slogan !== 'undefined') datosActualizar.slogan = slogan
        if (typeof descripcion !== 'undefined') datosActualizar.descripcion = descripcion
        if (typeof estado !== 'undefined') datosActualizar.estado = estado

        const productoraActualizada = await Productora.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        )

        return res.json(productoraActualizada)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const deleteProductora = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const productoraEliminada = await Productora.findByIdAndDelete(id)
        if (!productoraEliminada) {
            return res.status(404).json({ msj: 'Productora no encontrada' })
        }
        return res.json(productoraEliminada)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

module.exports = {
    createProductora,
    getProductoras,
    getProductoraById,
    getProductorasByEstado,
    updateProductora,
    deleteProductora
}
