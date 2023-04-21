import { Router } from 'express'
import ctrl from '../../controllers/review.js'
import { validateBody, authenticate } from '../../middleware/index.js'
import { schemas } from '../../models/review.js'

const router = Router()

router.get('/', authenticate, ctrl.getReviewsByOwner)
router.get('/:product', ctrl.getByProduct)
router.post('/add', authenticate, validateBody(schemas.addSchema), ctrl.addReview)

export default router
