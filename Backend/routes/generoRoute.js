const { Router } = require ('express')
const { 
    createGenero, 
    getGeneros, 
    getGeneroById, 
    updateGenero, 
    deleteGenero 
} = require('../controllers/generoController')
const { validarNombreGeneroUnico } = require('../middlewares/generoMiddleware')

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Generos
 *   description: Gestión de géneros
 */

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Crea un género
 *     tags: [Generos]
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
 *                 example: Acción
 *               descripcion:
 *                 type: string
 *                 example: Películas de acción
 *     responses:
 *       201:
 *         description: Género creado
 *       400:
 *         description: Validación fallida o nombre duplicado
 *       500:
 *         description: Error en el servidor
 */
router.post('/', validarNombreGeneroUnico, createGenero)

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Lista todos los géneros
 *     tags: [Generos]
 *     responses:
 *       200:
 *         description: Lista de géneros
 *       500:
 *         description: Error en el servidor
 */
router.get('/', getGeneros)

/**
 * @swagger
 * /generos/{id}:
 *   get:
 *     summary: Obtiene un género por ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Género encontrado
 *       404:
 *         description: Género no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', getGeneroById)

/**
 * @swagger
 * /generos/{id}:
 *   put:
 *     summary: Actualiza un género por ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Aventura
 *               descripcion:
 *                 type: string
 *                 example: Películas de aventura
 *               estado:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Género actualizado
 *       400:
 *         description: Validación fallida o nombre duplicado
 *       404:
 *         description: Género no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', validarNombreGeneroUnico, updateGenero)

/**
 * @swagger
 * /generos/{id}:
 *   delete:
 *     summary: Elimina un género por ID
 *     tags: [Generos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del género
 *     responses:
 *       200:
 *         description: Género eliminado
 *       404:
 *         description: Género no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', deleteGenero)

module.exports = router
 