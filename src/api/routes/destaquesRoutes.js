const {Router} = require('express');
const destaqueController = require('../controller/destaqueController.js')
// const upload = require('../config/multer')

const router = Router();

router
    .get('/', destaqueController.todosDestaques)
    .get('/:id', destaqueController.buscarDestaquePorId)
    .post('/', destaqueController.criaDestaque)
    .put('/:id', destaqueController.updateDestaque)
    .delete('/:id', destaqueController.deleteDestaque)


module.exports = router;