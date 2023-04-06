import { Router } from 'express'
import * as ctrl from '../../controllers/categories.js'
import catchHandler from '../../middleware/catchHandler.js'

const categoriesRouter = Router()

categoriesRouter.get('/', catchHandler(ctrl.getAllCategories))
categoriesRouter.get('/:category', catchHandler(ctrl.getCategoryByUrl))

export default categoriesRouter
