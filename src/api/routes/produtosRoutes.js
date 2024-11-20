const {Router} = require('express');

const router = Router();

router
    .get('/produto')
    .post('/produto')
    .put('/produto')
    .delete('/produto')

module.exports = router;