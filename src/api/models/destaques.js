module.exports = (sequelize, DataTypes) => {
    const destaques = sequelize.define('destaques', {
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'produtos',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      descricao: {
        type: DataTypes.STRING(300),
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
      tableName: 'destaques',
      timestamps: true
    });
  
    destaques.associate = models => {
      destaques.belongsTo(models.produtos, {
        foreignKey: 'product_id'
      });
    };
  
    return destaques;
  };
  