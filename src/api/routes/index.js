const produtos = require('./produtosRoutes.js')
const empresa = require('./empresaRoutes.js')
const destaques = require('./destaquesRoutes.js')

module.exports = app =>{
    app.use(
        produtos,
        destaques,
        empresa
    )
};

