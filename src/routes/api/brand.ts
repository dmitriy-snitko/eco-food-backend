import { Router } from 'express'
import ctrl from '../../controllers/brand.js'

const router = Router()

router.get('/', ctrl.getAllBrands)

export default router
