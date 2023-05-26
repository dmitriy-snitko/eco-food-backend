import { Router } from 'express'
import ctrl from '../../controllers/country.js'

const router = Router()

router.get('/', ctrl.getAllCountries)

export default router
