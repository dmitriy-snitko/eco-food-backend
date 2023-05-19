import { Router } from 'express'
import ctrl from '../../controllers/availability.js'

const router = Router()

router.get('/', ctrl.getAllAvailability)

export default router
