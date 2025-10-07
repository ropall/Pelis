const { request, response } = require('express')
const Director = require('../models/director')

const validarNombreDirectorUnico = async (req = request, res = response, next) => {
	try {
		const { nombres } = req.body
		if (typeof nombres === 'undefined') {
			return next()
		}

		const { id } = req.params
		const filtro = id ? { nombres, _id: { $ne: id } } : { nombres }
		const existe = await Director.findOne(filtro)
		if (existe) {
			return res.status(400).json({ msj: 'El director con esos nombres ya existe' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

module.exports = {
	validarNombreDirectorUnico
}


