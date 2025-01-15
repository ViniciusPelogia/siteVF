module.exports = (sequelize, DataTypes) => {
    const imagensxempresa = sequelize.define('imagensxempresa', {
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
      empresa_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'empresa',
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
      tableName: 'imagensxempresa',
      timestamps: true
    });
  
    imagensxempresa.associate = (models) => {
      imagensxempresa.belongsTo(models.imagens, {
        foreignKey: 'imagem_id'
      });
      imagensxempresa.belongsTo(models.empresa, {
        foreignKey: 'empresa_id'
      });
    };
  
    return imagensxempresa;
  };
  