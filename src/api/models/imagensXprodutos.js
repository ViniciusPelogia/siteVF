module.exports = (sequelize, DataTypes) => {
    const imagensXprodutos = sequelize.define(
      "imagensXprodutos",
      {
        imagem_id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "imagens",
            key: "id",
          },
        },
        product_id: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false,
          references: {
            model: "produtos",
            key: "id",
          },
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
        tableName: "imagensXprodutos",
        timestamps: true,
      }
    );
  
    imagensXprodutos.associate = models => {
      imagensXprodutos.belongsTo(models.imagens, {
        foreignKey: "imagem_id",
      });
      imagensXprodutos.belongsTo(models.produtos, {
        foreignKey: "product_id",
      });
    };
  
    return imagensXprodutos;
  };
  