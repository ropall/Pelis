const { Router } = require ('express')
const { 
    createGenero, 
    getGeneros, 
    getGeneroById, 
    updateGenero, 
    deleteGenero 
} = require('../controllers/generoController')

const router = Router()

router.post('/', createGenero)
router.get('/', getGeneros)
router.get('/:id', getGeneroById)
router.put('/:id', updateGenero)
router.delete('/:id', deleteGenero)

module.exports = router
 