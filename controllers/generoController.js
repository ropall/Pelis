const Genero = require('../models/genero')
const {request, response} = require('express')

const createGenero = async (req = request, res = response) => {

    try {
        const { nombre, descripcion } = req.body

        const generoBD = await Genero.findOne({ nombre: nombre})
        if (generoBD) {
            return res.status(400).json({ msj: 'El género ya existe' })
        }
    
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

const getGeneroById = async (id) => {

}

const updateGenero = async (id, genero) => {

}

const deleteGenero = async (id) => {

}   

module.exports = {
    createGenero,
    getGeneros,
    getGeneroById,
    updateGenero,
    deleteGenero
}   