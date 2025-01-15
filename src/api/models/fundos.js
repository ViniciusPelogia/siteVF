module.exports = (sequelize, DataTypes) => {
    const fundos = sequelize.define('fundos', {
      imagem_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'imagens',
          key: 'id'
        },
        onDelete: 'CASCADE'
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
      tableName: 'fundo',
      timestamps: true
    });
  
    fundos.associate = (models) => {
      fundos.belongsTo(models.imagens, {
        foreignKey: 'imagem_id'
      });
    };
  
    return fundos;
  };
  