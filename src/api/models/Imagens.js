module.exports = (sequelize, DataTypes) => {
  const imagens = sequelize.define('imagens', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    caminho: {
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
    tableName: 'imagens',
    timestamps: true
  });

  imagens.associate = models => {
    imagens.hasMany(models.imagensxprodutos, {
      foreignKey: 'imagem_id'
    });
    imagens.hasMany(models.imagensxempresa, {
      foreignKey: 'imagem_id'
    });
  };

  return imagens;
};
