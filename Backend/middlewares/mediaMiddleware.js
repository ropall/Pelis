const { request, response } = require('express')
const Media = require('../models/media')
const Genero = require('../models/genero')
const Director = require('../models/director')
const Productora = require('../models/productora')

// Valida que el serial sea único (POST) y único excluyendo el propio id (PUT)
const validarSerialUnico = async (req = request, res = response, next) => {
	try {
		const { serial } = req.body
		if (typeof serial === 'undefined') {
			return next()
		}

		const { id } = req.params
		const filtro = id ? { serial, _id: { $ne: id } } : { serial }
		const existe = await Media.findOne(filtro)
		if (existe) {
			return res.status(400).json({ msj: 'El serial ya existe' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

// Valida que la URL sea única (POST) y única excluyendo el propio id (PUT)
const validarUrlUnica = async (req = request, res = response, next) => {
	try {
		const { url } = req.body
		if (typeof url === 'undefined') {
			return next()
		}

		const { id } = req.params
		const filtro = id ? { url, _id: { $ne: id } } : { url }
		const existe = await Media.findOne(filtro)
		if (existe) {
			return res.status(400).json({ msj: 'La URL ya existe' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

// Valida que el género principal exista y esté activo
const validarGeneroActivo = async (req = request, res = response, next) => {
	try {
		const { generoPrincipal } = req.body
		if (typeof generoPrincipal === 'undefined') {
			return next()
		}

		const genero = await Genero.findById(generoPrincipal)
		if (!genero) {
			return res.status(404).json({ msj: 'El género no existe' })
		}

		if (!genero.estado) {
			return res.status(400).json({ msj: 'El género debe estar activo' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

// Valida que el director exista y esté activo
const validarDirectorActivo = async (req = request, res = response, next) => {
	try {
		const { director } = req.body
		if (typeof director === 'undefined') {
			return next()
		}

		const directorEncontrado = await Director.findById(director)
		if (!directorEncontrado) {
			return res.status(404).json({ msj: 'El director no existe' })
		}

		if (!directorEncontrado.estado) {
			return res.status(400).json({ msj: 'El director debe estar activo' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

// Valida que la productora exista y esté activa
const validarProductoraActiva = async (req = request, res = response, next) => {
	try {
		const { productora } = req.body
		if (typeof productora === 'undefined') {
			return next()
		}

		const productoraEncontrada = await Productora.findById(productora)
		if (!productoraEncontrada) {
			return res.status(404).json({ msj: 'La productora no existe' })
		}

		if (!productoraEncontrada.estado) {
			return res.status(400).json({ msj: 'La productora debe estar activa' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

module.exports = {
	validarSerialUnico,
	validarUrlUnica,
	validarGeneroActivo,
	validarDirectorActivo,
	validarProductoraActiva
}
