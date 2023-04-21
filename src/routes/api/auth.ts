import { Router } from 'express'
import ctrl from '../../controllers/auth.js'
import { validateBody, authenticate } from '../../middleware/index.js'
import { schemas } from '../../models/user.js'

const router = Router()

router.get('/current', authenticate, ctrl.getCurrent)
router.post('/register', validateBody(schemas.registerSchema), ctrl.register)
router.post('/login', validateBody(schemas.loginSchema), ctrl.login)
router.post('/logout', authenticate, ctrl.logout)

export default router
