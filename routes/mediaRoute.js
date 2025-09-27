const { Router } = require('express')
const {
	createMedia,
	getMedias,
	getMediaById,
	getMediasByGenero,
	getMediasByAño,
	getMediasByEstado,
	updateMedia,
	deleteMedia
} = require('../controllers/mediaController')
const { 
	validarSerialUnico, 
	validarUrlUnica, 
	validarGeneroActivo,
	validarDirectorActivo,
	validarProductoraActiva
} = require('../middlewares/mediaMiddleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Gestión de películas y series
 */

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Crea una nueva película o serie
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serial
 *               - titulo
 *               - sinopsis
 *               - url
 *               - añoEstreno
 *               - generoPrincipal
 *               - director
 *               - productora
 *             properties:
 *               serial:
 *                 type: string
 *                 example: "MOV001"
 *               titulo:
 *                 type: string
 *                 example: "Inception"
 *               sinopsis:
 *                 type: string
 *                 example: "Un ladrón que roba secretos a través de la tecnología de los sueños"
 *               url:
 *                 type: string
 *                 example: "https://example.com/inception"
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/inception-poster.jpg"
 *               añoEstreno:
 *                 type: number
 *                 example: 2010
 *               generoPrincipal:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6789012345"
 *               director:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6789012346"
 *               productora:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6789012347"
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Media creada exitosamente
 *       400:
 *         description: Validación fallida, serial/URL duplicado, género/director/productora inactivo
 *       500:
 *         description: Error en el servidor
 */
router.post('/', [validarSerialUnico, validarUrlUnica, validarGeneroActivo, validarDirectorActivo, validarProductoraActiva], createMedia)

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Lista todas las películas y series
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Lista de media
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getMedias)

/**
 * @swagger
 * /media/estado:
 *   get:
 *     summary: Lista media por estado
 *     tags: [Media]
 *     parameters:
 *       - in: query
 *         name: estado
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Estado de la media (true o false)
 *     responses:
 *       200:
 *         description: Lista filtrada de media
 *       400:
 *         description: Falta el estado
 *       500:
 *         description: Error en el servidor
 */
router.get('/estado', getMediasByEstado)

/**
 * @swagger
 * /media/genero/{generoId}:
 *   get:
 *     summary: Lista media por género
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: generoId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Lista de media por género
 *       500:
 *         description: Error en el servidor
 */
router.get('/genero/:generoId', getMediasByGenero)

/**
 * @swagger
 * /media/año/{año}:
 *   get:
 *     summary: Lista media por año de estreno
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: año
 *         schema:
 *           type: number
 *         required: true
 *         description: Año de estreno
 *     responses:
 *       200:
 *         description: Lista de media por año
 *       500:
 *         description: Error en el servidor
 */
router.get('/año/:año', getMediasByAño)

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Obtiene una película o serie por ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la media
 *     responses:
 *       200:
 *         description: Media encontrada
 *       404:
 *         description: Media no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', getMediaById)

/**
 * @swagger
 * /media/{id}:
 *   put:
 *     summary: Actualiza una película o serie por ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la media
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serial:
 *                 type: string
 *                 example: "MOV002"
 *               titulo:
 *                 type: string
 *                 example: "The Dark Knight"
 *               sinopsis:
 *                 type: string
 *                 example: "Batman debe aceptar uno de los mayores desafíos psicológicos y físicos de su capacidad"
 *               url:
 *                 type: string
 *                 example: "https://example.com/dark-knight"
 *               imagen:
 *                 type: string
 *                 example: "https://example.com/dark-knight-poster.jpg"
 *               añoEstreno:
 *                 type: number
 *                 example: 2008
 *               generoPrincipal:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6789012345"
 *               director:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6789012346"
 *               productora:
 *                 type: string
 *                 example: "64a1b2c3d4e5f6789012347"
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Media actualizada
 *       400:
 *         description: Validación fallida, serial/URL duplicado, género/director/productora inactivo
 *       404:
 *         description: Media no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', [validarSerialUnico, validarUrlUnica, validarGeneroActivo, validarDirectorActivo, validarProductoraActiva], updateMedia)

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Elimina una película o serie por ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la media
 *     responses:
 *       200:
 *         description: Media eliminada
 *       404:
 *         description: Media no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', deleteMedia)

module.exports = router
