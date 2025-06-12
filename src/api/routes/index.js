const { Router } = require('express')
const produtos = require('./produtosRoutes')
const empresa = require('./empresaRoutes')
const destaques = require('./destaquesRoutes')

const router = Router()

router.use('/destaques', destaques)
router.use('/produtos', produtos)
router.use('/empresa', empresa)

module.exports = router
