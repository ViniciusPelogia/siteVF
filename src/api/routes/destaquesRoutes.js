const {Router} = require('express');
const destaqueController = require('../controller/destaqueController.js')
// const upload = require('../config/multer')

const router = Router();

router
    .get('/destaques/api/', destaqueController.todosDestaques)
    .get('/destaques/api/:id', destaqueController.buscarDestaquePorId)
    .post('/destaques/api/', destaqueController.criaDestaque)
    .put('/destaques/api/:id', destaqueController.updateDestaque)
    .delete('/destaques/api/:id', destaqueController.deleteDestaque)


module.exports = router;