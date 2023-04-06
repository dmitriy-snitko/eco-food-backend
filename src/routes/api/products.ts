import { Router } from 'express'
import * as ctrl from '../../controllers/products.js'
import catchHandler from '../../middleware/catchHandler.js'

const productsRouter = Router()

productsRouter.get('/', catchHandler(ctrl.getAllProducts))
productsRouter.get('/:category', catchHandler(ctrl.getProductsByCategory))
productsRouter.get('/:category/:product', catchHandler(ctrl.getOneProduct))

export default productsRouter
