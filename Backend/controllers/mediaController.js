const Media = require('../models/media')
const {request, response} = require('express')

const createMedia = async (req = request, res = response) => {
    try {
        console.log('=== CREAR MEDIA - INICIO ===')
        console.log('Datos recibidos del frontend:', JSON.stringify(req.body, null, 2))
        
        const { serial, titulo, sinopsis, url, imagen, añoEstreno, generoPrincipal, director, productora } = req.body

        // Validar campos requeridos
        if (!serial) {
            console.log('ERROR: Falta serial')
            return res.status(400).json({ msj: 'El serial es obligatorio' })
        }
        if (!titulo) {
            console.log('ERROR: Falta título')
            return res.status(400).json({ msj: 'El título es obligatorio' })
        }
        if (!sinopsis) {
            console.log('ERROR: Falta sinopsis')
            return res.status(400).json({ msj: 'La sinopsis es obligatoria' })
        }
        if (!url) {
            console.log('ERROR: Falta URL')
            return res.status(400).json({ msj: 'La URL es obligatoria' })
        }
        if (!añoEstreno) {
            console.log('ERROR: Falta año de estreno')
            return res.status(400).json({ msj: 'El año de estreno es obligatorio' })
        }
        if (!generoPrincipal) {
            console.log('ERROR: Falta género principal')
            return res.status(400).json({ msj: 'El género principal es obligatorio' })
        }
        if (!director) {
            console.log('ERROR: Falta director')
            return res.status(400).json({ msj: 'El director es obligatorio' })
        }
        if (!productora) {
            console.log('ERROR: Falta productora')
            return res.status(400).json({ msj: 'La productora es obligatoria' })
        }

        // Convertir añoEstreno a número
        console.log('Año de estreno recibido:', añoEstreno, 'Tipo:', typeof añoEstreno)
        const añoEstrenoNum = parseInt(añoEstreno)
        console.log('Año de estreno convertido:', añoEstrenoNum, 'Tipo:', typeof añoEstrenoNum)
        if (isNaN(añoEstrenoNum)) {
            console.log('ERROR: Año de estreno no es un número válido:', añoEstreno)
            return res.status(400).json({ msj: 'El año de estreno debe ser un número válido' })
        }

        const datos = { 
            serial,
            titulo, 
            sinopsis, 
            url, 
            imagen, 
            añoEstreno: añoEstrenoNum, 
            generoPrincipal, 
            director, 
            productora 
        }
        
        console.log('Datos procesados para guardar:', JSON.stringify(datos, null, 2))
        
        const nuevaMedia = new Media(datos)
        console.log('Objeto Media creado, guardando...')
        
        await nuevaMedia.save()
        console.log('Media guardada exitosamente, ID:', nuevaMedia._id)

        // Populate para devolver los datos completos
        await nuevaMedia.populate('generoPrincipal', 'nombre')
        await nuevaMedia.populate('director', 'nombres')
        await nuevaMedia.populate('productora', 'nombre')

        console.log('Media con populate:', JSON.stringify(nuevaMedia, null, 2))
        console.log('=== CREAR MEDIA - ÉXITO ===')
        
        res.status(201).json(nuevaMedia)
    } catch (error) {
        console.log('=== CREAR MEDIA - ERROR ===')
        console.log('Error completo:', error)
        console.log('Error message:', error.message)
        console.log('Error name:', error.name)
        if (error.errors) {
            console.log('Validation errors:', error.errors)
        }
        console.log('=== FIN ERROR ===')
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMedias = async (req = request, res = response) => {
    try {
        const medias = await Media.find()
            .populate('generoPrincipal', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
        return res.json(medias)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const getMediaById = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const media = await Media.findById(id)
            .populate('generoPrincipal', 'nombre')
            .populate('director', 'nombres')
            .populate('productora', 'nombre')
        if (!media) {
            return res.status(404).json({ msj: 'Media no encontrada' })
        }
        return res.json(media)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msj: 'Error en el servidor' })
    }
}

const updateMedia = async (req = request, res = response) => {
    try {
        const { id } = req.params
        const { serial, titulo, sinopsis, url, imagen, añoEstreno, generoPrincipal, director, productora } = req.body

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

        const mediaActualizada = await Media.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true }
        )
        .populate('generoPrincipal', 'nombre')
        .populate('director', 'nombres')
        .populate('productora', 'nombre')

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
    updateMedia,
    deleteMedia
}