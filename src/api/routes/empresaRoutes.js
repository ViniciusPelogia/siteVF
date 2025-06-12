const {Router} = require('express');
const empresaController = require('../controller/empresaController.js')
const upload = require('../config/multer')

const router = Router();

router
    .get('/empresa/api/', empresaController.buscaEmpresa)
    .post('/empresa/api/', upload.single('logo'), empresaController.criaEmpresa)
    .post('/newsletter', empresaController.newsletter)
    .post('/empresa/api/imagem/:id', upload.single('file'), empresaController.criaImagensEmpresa)
    .post('/fundo', empresaController.criaFundo)

module.exports = router;