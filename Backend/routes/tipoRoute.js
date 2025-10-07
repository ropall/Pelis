const { Router } = require('express')
const {
	createTipo,
	getTipos,
	getTipoById,
	updateTipo,
	deleteTipo
} = require('../controllers/tipoController')
const { validarNombreTipoUnico } = require('../middlewares/tipoMiddleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tipos
 *   description: Gestión de tipos
 */

/**
 * @swagger
 * /tipos:
 *   post:
 *     summary: Crea un tipo
 *     tags: [Tipos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Película
 *               descripcion:
 *                 type: string
 *                 example: Contenido cinematográfico
 *     responses:
 *       201:
 *         description: Tipo creado
 *       400:
 *         description: Validación fallida o nombre duplicado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', validarNombreTipoUnico, createTipo)

/**
 * @swagger
 * /tipos:
 *   get:
 *     summary: Lista todos los tipos
 *     tags: [Tipos]
 *     responses:
 *       200:
 *         description: Lista de tipos
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getTipos)

/**
 * @swagger
 * /tipos/{id}:
 *   get:
 *     summary: Obtiene un tipo por ID
 *     tags: [Tipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tipo
 *     responses:
 *       200:
 *         description: Tipo encontrado
 *       404:
 *         description: Tipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', getTipoById)

/**
 * @swagger
 * /tipos/{id}:
 *   put:
 *     summary: Actualiza un tipo por ID
 *     tags: [Tipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tipo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Serie
 *               descripcion:
 *                 type: string
 *                 example: Contenido seriado
 *     responses:
 *       200:
 *         description: Tipo actualizado
 *       400:
 *         description: Validación fallida o nombre duplicado
 *       404:
 *         description: Tipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validarNombreTipoUnico, updateTipo)

/**
 * @swagger
 * /tipos/{id}:
 *   delete:
 *     summary: Elimina un tipo por ID
 *     tags: [Tipos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del tipo
 *     responses:
 *       200:
 *         description: Tipo eliminado
 *       404:
 *         description: Tipo no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', deleteTipo)

module.exports = router
