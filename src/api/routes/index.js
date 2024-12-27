const produtos = require('./produtosRoutes.js')
const destaques = require('./destaquesRoutes.js')

module.exports = app =>{
    app.use(
        produtos,
        destaques
    )
};

