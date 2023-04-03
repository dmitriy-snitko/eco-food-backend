import { Router } from 'express'
import * as ctrl from '../../controllers/categoriesController.js'
import catchHandler from '../../middleware/catchHandler.js'

const categoriesRouter = Router()

categoriesRouter.get('/', catchHandler(ctrl.getAllCategories))
categoriesRouter.get('/:url', catchHandler(ctrl.getCategoryByUrl))

export default categoriesRouter
