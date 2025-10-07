const { Router } = require('express')
const {
	createDirector,
	getDirectores,
	getDirectoresByEstado,
	updateDirector
} = require('../controllers/directorController')
const { validarNombreDirectorUnico } = require('../middlewares/directorMiddleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Directores
 *   description: Gestión de directores
 */

/**
 * @swagger
 * /directores:
 *   post:
 *     summary: Crea un director
 *     tags: [Directores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombres
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: Christopher Nolan
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Director creado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', validarNombreDirectorUnico, createDirector)

/**
 * @swagger
 * /directores:
 *   get:
 *     summary: Lista todos los directores
 *     tags: [Directores]
 *     responses:
 *       200:
 *         description: Lista de directores
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getDirectores)

/**
 * @swagger
 * /directores/estado:
 *   get:
 *     summary: Lista directores por estado
 *     tags: [Directores]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Estado del director (true o false)
 *     responses:
 *       200:
 *         description: Lista filtrada de directores
 *       400:
 *         description: Falta el estado
 *       500:
 *         description: Error en el servidor
 */
router.get('/estado', getDirectoresByEstado)

/**
 * @swagger
 * /directores/{id}:
 *   put:
 *     summary: Actualiza un director por ID
 *     tags: [Directores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del director
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *                 example: Denis Villeneuve
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Director actualizado
 *       404:
 *         description: Director no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validarNombreDirectorUnico, updateDirector)

module.exports = router


