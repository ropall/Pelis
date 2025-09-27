const { Router } = require('express')
const {
	createProductora,
	getProductoras,
	getProductoraById,
	getProductorasByEstado,
	updateProductora,
	deleteProductora
} = require('../controllers/productoraController')
const { validarNombreProductoraUnico } = require('../middlewares/productoraMiddleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Productoras
 *   description: Gestión de productoras
 */

/**
 * @swagger
 * /productoras:
 *   post:
 *     summary: Crea una productora
 *     tags: [Productoras]
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
 *                 example: Warner Bros
 *               slogan:
 *                 type: string
 *                 example: "Where the story begins"
 *               descripcion:
 *                 type: string
 *                 example: Productora de cine y televisión
 *             note: El estado se establece automáticamente como activo (true) por defecto
 *     responses:
 *       201:
 *         description: Productora creada
 *       400:
 *         description: Validación fallida o nombre duplicado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', validarNombreProductoraUnico, createProductora)

/**
 * @swagger
 * /productoras:
 *   get:
 *     summary: Lista todas las productoras
 *     tags: [Productoras]
 *     responses:
 *       200:
 *         description: Lista de productoras
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getProductoras)

/**
 * @swagger
 * /productoras/estado:
 *   get:
 *     summary: Lista productoras por estado
 *     tags: [Productoras]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Estado de la productora (true o false)
 *     responses:
 *       200:
 *         description: Lista filtrada de productoras
 *       400:
 *         description: Falta el estado
 *       500:
 *         description: Error en el servidor
 */
router.get('/estado', getProductorasByEstado)

/**
 * @swagger
 * /productoras/{id}:
 *   get:
 *     summary: Obtiene una productora por ID
 *     tags: [Productoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la productora
 *     responses:
 *       200:
 *         description: Productora encontrada
 *       404:
 *         description: Productora no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', getProductoraById)

/**
 * @swagger
 * /productoras/{id}:
 *   put:
 *     summary: Actualiza una productora por ID
 *     tags: [Productoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la productora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Universal Pictures
 *               slogan:
 *                 type: string
 *                 example: "A Universal Company"
 *               descripcion:
 *                 type: string
 *                 example: Productora de cine estadounidense
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Productora actualizada
 *       400:
 *         description: Validación fallida o nombre duplicado
 *       404:
 *         description: Productora no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validarNombreProductoraUnico, updateProductora)

/**
 * @swagger
 * /productoras/{id}:
 *   delete:
 *     summary: Elimina una productora por ID
 *     tags: [Productoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la productora
 *     responses:
 *       200:
 *         description: Productora eliminada
 *       404:
 *         description: Productora no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', deleteProductora)

module.exports = router
