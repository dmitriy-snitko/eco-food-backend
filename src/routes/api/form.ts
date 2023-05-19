import { Router } from 'express'
import ctrl from '../../controllers/form.js'

const router = Router()

router.get('/', ctrl.getAllForms)

export default router
