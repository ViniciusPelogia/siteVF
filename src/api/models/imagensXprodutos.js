module.exports = (sequelize, DataTypes) => {
  const imagensxprodutos = sequelize.define('imagensxprodutos', {
    imagem_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'imagens',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'produtos',
        key: 'id'
      }
    },
    cor_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // NULL indica que a imagem é genérica para o produto
      references: {
        model: 'cores',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'imagensxprodutos',
    timestamps: true
  });

  imagensxprodutos.associate = models => {
    imagensxprodutos.belongsTo(models.produtos, {
      foreignKey: 'product_id'
    });
    imagensxprodutos.belongsTo(models.imagens, {
      foreignKey: 'imagem_id'
    });
    imagensxprodutos.belongsTo(models.cores, {
      foreignKey: 'cor_id'
    });
  };

  return imagensxprodutos;
};
