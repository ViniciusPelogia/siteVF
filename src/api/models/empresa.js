module.exports = (sequelize, DataTypes) => {
    const empresa = sequelize.define('empresa', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descricao: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cnpj:{
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
      },
      instagram: {
        type: DataTypes.STRING,
        allowNull: false
      },
      telefone: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'empresa',
      timestamps: true
    });
  
    empresa.associate = (models) => {
      empresa.hasMany(models.imagensxempresa, {
        foreignKey: 'empresa_id'
      });
    };
  
    return empresa;
  };
  