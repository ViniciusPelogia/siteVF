module.exports = (sequelize, DataTypes) => {
  const produtosxcores = sequelize.define('produtosxcores', {
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
      primaryKey: true,
      allowNull: false,
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
    tableName: 'produtosxcores',
    timestamps: true
  });

  produtosxcores.associate = models => {
    produtosxcores.belongsTo(models.produtos, {
      foreignKey: 'product_id'
    });
    produtosxcores.belongsTo(models.cores, {
      foreignKey: 'cor_id'
    });
  };

  return produtosxcores;
};
