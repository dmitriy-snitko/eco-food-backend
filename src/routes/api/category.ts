import { Router } from 'express'
import ctrl from '../../controllers/category.js'

const router = Router()

router.get('/', ctrl.getAllCategories)
router.get('/:categoryUrl', ctrl.getCategoryByUrl)

export default router
