import { Router } from 'express'
import ctrl from '../../controllers/delivery.js'

const router = Router()

router.get('/', ctrl.getAllDeliverys)

export default router
