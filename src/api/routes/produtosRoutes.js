const {Router} = require('express');
const produtoController = require('../controller/produtoController.js')
const upload = require('../config/multer')

const router = Router();

router
    .get('/produto', produtoController.buscaTodosprodutos)
    .get('/produto/:id', produtoController.buscaProdutoPorId)
    .post('/produto', produtoController.criaProduto)
    .post('/imagem/:id', upload.single('file'), produtoController.criaImagem)
    .put('/produto', )
    .delete('/produto/:id', produtoController.excluiProduto)

module.exports = router;