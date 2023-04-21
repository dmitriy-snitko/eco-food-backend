import { Router } from 'express'
import ctrl from '../../controllers/categories.js'

const router = Router()

router.get('/', ctrl.getAllCategories)
router.get('/:categoryUrl', ctrl.getCategoryByUrl)

export default router
