module.exports = (sequelize, DataTypes) => {
    const Imagens = sequelize.define('Imagens', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      caminho: {
        type: DataTypes.STRING,
        allowNull: false
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: 'produtos',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    }, {
      tableName: 'imagens',
      timestamps: false
    });
  
    Imagens.associate = models => {
      Imagens.belongsTo(models.Produtos, { foreignKey: 'productId', as: 'produtos' });
    };
  
    return Imagens;
  };
  