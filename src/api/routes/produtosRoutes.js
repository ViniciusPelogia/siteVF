const {Router} = require('express');
const produtoController = require('../controller/produtoController.js')
const upload = require('../config/multer')

const router = Router();

router
    .get('/produto/api', produtoController.buscaTodosprodutos)
    .get('/produto/api/:id', produtoController.buscaProdutoPorId)
    .get('/produto/api/:id/cores', produtoController.buscaCor)
    .post('/produto/api/', produtoController.criaProduto)
    .post('/imagem/:id', upload.single('file'), produtoController.criaImagem)
    .put('/produto/api/', )
    .delete('/produto/api/:id', produtoController.excluiProduto)
    .delete('/produto/api/:id/remover-cor', produtoController.removeCorDoProduto)

module.exports = router;