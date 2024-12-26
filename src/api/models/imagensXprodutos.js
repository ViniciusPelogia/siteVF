module.exports = (sequelize, DataTypes) => {
    const imagensxprodutos = sequelize.define(
      "imagensxprodutos",
      {
        imagem_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        },
        product_id: {
          type: DataTypes.UUID,
          allowNull: false,
          primaryKey: true,
        
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        tableName: "imagensxprodutos",
        timestamps: true,
      }
    );
  
    imagensxprodutos.associate = models => {
      imagensxprodutos.belongsTo(models.imagens, {
        foreignKey: "imagem_id",
      });
      imagensxprodutos.belongsTo(models.produtos, {
        foreignKey: "product_id",
      });
    };
  
    return imagensxprodutos;
  };
  