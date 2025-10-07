const Media = require('../models/media')
const { request, response } = require('express')

const createMedia = async (req = request, res = response) => {
    try {
        const { serial, titulo, sinopsis, url, imagen, añoEstreno, generoPrincipal, director, productora, estado } = req.body

        const datos = {
            serial,
            titulo,
            sinopsis,
            url,
            imagen,
            añoEstreno,
            generoPrincipal,
            director,
            productora,
            estado
        }

        const nuevaMedia = new Media(datos)
        await nuevaMedia.save()

        // Populate para obtener los datos del género, director y productora
        await nuevaMedia.populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])

        return res.status(201).json(nuevaMedia)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find().populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])
        return res.json(medias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMediaById = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const media = await Media.findById(id).populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])
        if (!media) {
            return res.status(404).json({ msj: 'Media no encontrada' })
        }
        return res.json(media)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMediasByGenero = async (req = request, res = response) => {
    try {
        const { generoId } = req.params
        const medias = await Media.find({ generoPrincipal: generoId }).populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])
        return res.json(medias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMediasByAño = async (req = request, res = response) => {
    try {
        const { año } = req.params
        const medias = await Media.find({ añoEstreno: parseInt(año) }).populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])
        return res.json(medias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMediasByEstado = async (req = request, res = response) => {
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

        const medias = await Media.find({ estado }).populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])
        return res.json(medias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { serial, titulo, sinopsis, url, imagen, añoEstreno, generoPrincipal, director, productora, estado } = req.body

        const mediaBD = await Media.findById(id)
        if (!mediaBD) {
            return res.status(404).json({ msj: 'Media no encontrada' })
        }

        const datosActualizar = {
            fechaActualizacion: new Date()
        }
        if (typeof serial !== 'undefined') datosActualizar.serial = serial
        if (typeof titulo !== 'undefined') datosActualizar.titulo = titulo
        if (typeof sinopsis !== 'undefined') datosActualizar.sinopsis = sinopsis
        if (typeof url !== 'undefined') datosActualizar.url = url
        if (typeof imagen !== 'undefined') datosActualizar.imagen = imagen
        if (typeof añoEstreno !== 'undefined') datosActualizar.añoEstreno = añoEstreno
        if (typeof generoPrincipal !== 'undefined') datosActualizar.generoPrincipal = generoPrincipal
        if (typeof director !== 'undefined') datosActualizar.director = director
        if (typeof productora !== 'undefined') datosActualizar.productora = productora
        if (typeof estado !== 'undefined') datosActualizar.estado = estado

        const mediaActualizada = await Media.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        ).populate([
            { path: 'generoPrincipal', select: 'nombre descripcion' },
            { path: 'director', select: 'nombres' },
            { path: 'productora', select: 'nombre slogan' }
        ])

        return res.json(mediaActualizada)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const deleteMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const mediaEliminada = await Media.findByIdAndDelete(id)
        if (!mediaEliminada) {
            return res.status(404).json({ msj: 'Media no encontrada' })
        }
        return res.json(mediaEliminada)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

module.exports = {
    createMedia,
    getMedias,
    getMediaById,
    getMediasByGenero,
    getMediasByAño,
    getMediasByEstado,
    updateMedia,
    deleteMedia
}
