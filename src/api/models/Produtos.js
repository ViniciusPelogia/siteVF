module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define('produtos', {
    id: {
      type: DataTypes.UUID,
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
    tableName: 'produtos',
    timestamps: true
  });

  produtos.associate = models => {
    produtos.hasMany(models.imagensXprodutos, {
      foreignKey: 'product_id'
    });
  };

  return produtos;
};
