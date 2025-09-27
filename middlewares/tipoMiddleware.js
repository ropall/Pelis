const { request, response } = require('express')
const Tipo = require('../models/tipo')

// Valida que el nombre sea único (POST) y único excluyendo el propio id (PUT)
const validarNombreTipoUnico = async (req = request, res = response, next) => {
	try {
		const { nombre } = req.body
		if (typeof nombre === 'undefined') {
			return next()
		}

		const { id } = req.params
		const filtro = id ? { nombre, _id: { $ne: id } } : { nombre }
		const existe = await Tipo.findOne(filtro)
		if (existe) {
			return res.status(400).json({ msj: 'El tipo con ese nombre ya existe' })
		}

		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

module.exports = {
	validarNombreTipoUnico
}
