const Director = require('../models/director')
const { request, response } = require('express')

const createDirector = async (req = request, res = response) => {
	try {
		const { nombres, estado } = req.body

		const datos = {
			nombres,
			estado
		}

		const nuevoDirector = new Director(datos)
		await nuevoDirector.save()

		return res.status(201).json(nuevoDirector)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

const getDirectores = async (req = request, res = response) => {
	try {
		const directores = await Director.find()
		return res.json(directores)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

const getDirectoresByEstado = async (req = request, res = response) => {
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

		const directores = await Director.find({ estado })
		return res.json(directores)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

const updateDirector = async (req = request, res = response) => {
	try {
		const { id } = req.params
		const { nombres, estado } = req.body

		const directorBD = await Director.findById(id)
		if (!directorBD) {
			return res.status(404).json({ msj: 'Director no encontrado' })
		}

		const datosActualizar = {
			fechaActualizacion: new Date()
		}
		if (typeof nombres !== 'undefined') datosActualizar.nombres = nombres
		if (typeof estado !== 'undefined') datosActualizar.estado = estado

		const directorActualizado = await Director.findByIdAndUpdate(
			id,
			datosActualizar,
			{ new: true }
		)

		return res.json(directorActualizado)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

const deleteDirector = async (req = request, res = response) => {
	try {
		const { id } = req.params
		const directorEliminado = await Director.findByIdAndDelete(id)
		if (!directorEliminado) {
			return res.status(404).json({ msj: 'Director no encontrado' })
		}
		return res.json(directorEliminado)
	} catch (error) {
		console.log(error)
		return res.status(500).json({ msj: 'Error en el servidor' })
	}
}

module.exports = {
	createDirector,
	getDirectores,
	getDirectoresByEstado,
	updateDirector,
	deleteDirector
}


