const {Router} = require('express');
const empresaController = require('../controller/empresaController.js')
const upload = require('../config/multer')

const router = Router();

router
    .get('/empresa', empresaController.buscaEmpresa)
    .post('/empresa', upload.single('logo'), empresaController.criaEmpresa)
    .post('/empresa/imagem/:id', upload.single('file'), empresaController.criaImagensEmpresa)
    .post('/fundo', empresaController.criaFundo)

module.exports = router;