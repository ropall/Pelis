const { request, response } = require('express')
const Productora = require('../models/productora')

// Valida que el nombre sea único (POST) y único excluyendo el propio id (PUT)
const validarNombreProductoraUnico = async (req = request, res = response, next) => {
	try {
		const { nombre } = req.body
		if (typeof nombre === 'undefined') {
			return next()
		}

		const { id } = req.params
		const filtro = id ? { nombre, _id: { $ne: id } } : { nombre }
		const existe = await Productora.findOne(filtro)
		if (existe) {
			return res.status(400).json({ msj: 'La productora con ese nombre ya existe' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

module.exports = {
	validarNombreProductoraUnico
}
