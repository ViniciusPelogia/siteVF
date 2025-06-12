const {Router} = require('express');
const produtoController = require('../controller/produtoController.js')
const upload = require('../config/multer')

const router = Router();

router
    .get('/', produtoController.buscaTodosprodutos)
    .get('/:id', produtoController.buscaProdutoPorId)
    .get('/:id/cores', produtoController.buscaCor)
    .post('/', produtoController.criaProduto)
    .post('/imagem/:id', upload.single('file'), produtoController.criaImagem)
    .put('/', )
    .delete('/:id', produtoController.excluiProduto)
    .delete('/:id/remover-cor', produtoController.removeCorDoProduto)

module.exports = router;