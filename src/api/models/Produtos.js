module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produtos', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'produtos',
      timestamps: false
    });
  
    Produtos.associate = models => {
      Produtos.hasMany(models.Imagens, { foreignKey: 'productId', as: 'imagens' });
    };
  
    return Produtos;
  };
  