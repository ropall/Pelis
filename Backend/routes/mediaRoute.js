const { Router } = require('express')
const {
	createMedia,
	getMedias,
	getMediaById,
	updateMedia,
	deleteMedia
} = require('../controllers/mediaController')

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
 *               - titulo
 *               - sinopsis
 *               - url
 *               - añoEstreno
 *               - generoPrincipal
 *               - director
 *               - productora
 *             properties:
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
 *     responses:
 *       201:
 *         description: Media creada exitosamente
 *       500:
 *         description: Error en el servidor
 */
router.post('/', createMedia)

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
 *     responses:
 *       200:
 *         description: Media actualizada
 *       404:
 *         description: Media no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', updateMedia)

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