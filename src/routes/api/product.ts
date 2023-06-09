import { Router } from 'express'
import ctrl from '../../controllers/product.js'

const router = Router()

router.get('/', ctrl.getAllProducts)
router.get('/:productUrl', ctrl.getOneProduct)
router.get('/by-category/:categoryUrl', ctrl.getProductsByCategory)

export default router
