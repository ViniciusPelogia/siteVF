module.exports = (sequelize, DataTypes) => {
  const produtos = sequelize.define('produtos', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    detalhes: {
      type: DataTypes.TEXT,
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
    // Associação com imagensxprodutos (já existente)
    produtos.hasMany(models.imagensxprodutos, {
      foreignKey: 'product_id'
    });
    // Associação com cores via produtosxcores (novidade)
    produtos.belongsToMany(models.cores, {
      through: models.produtosxcores,
      foreignKey: 'product_id'
    });
  };

  return produtos;
};
