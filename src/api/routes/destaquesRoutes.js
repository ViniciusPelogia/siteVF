const {Router} = require('express');
const destaqueController = require('../controller/destaqueController.js')
// const upload = require('../config/multer')

const router = Router();

router
    .get('/destaques/', destaqueController.todosDestaques)
    .get('/destaques/:id', destaqueController.buscarDestaquePorId)
    .post('/destaques/', destaqueController.criaDestaque)
    .put('/destaques/:id', destaqueController.updateDestaque)
    .delete('/destaques/:id', destaqueController.deleteDestaque)


module.exports = router;