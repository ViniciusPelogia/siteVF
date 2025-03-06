module.exports = (sequelize, DataTypes) => {
  const cores = sequelize.define('cores', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    codigo_hex: {
      type: DataTypes.STRING(7), // Exemplo: "#FF5733"
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
    tableName: 'cores',
    timestamps: true
  });

  cores.associate = models => {
    cores.belongsToMany(models.produtos, {
      through: models.produtosxcores,
      foreignKey: 'cor_id'
    });
  };

  return cores;
};
