const produtos = require('./produtosRoutes.js')

module.exports = app =>{
    app.use(
        produtos
    )
};

