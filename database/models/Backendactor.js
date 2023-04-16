const baseSchema = require("../schemas/baseSchema");

module.exports = (sequelize, DataTypes) => {
  const Backendactor = sequelize.define("Backendactor", 
    {
      ...baseSchema,
      name: {
        filed: 'name',
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        length: 50,
      },
      markup: {
        filed: 'markup',
        type: DataTypes.STRING,
        allowNull: true,
        length: 200,
        default: '',
      },
      permissions: {
        filed: 'permissions',
        type: DataTypes.JSON,
        require: true,
        allowNull: false,
        set(value) {
          this.setDataValue('permissions', JSON.stringify(value));
        },
      },
  }, {
    sequelize,
    tableName: "backend_actors",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  Backendactor.associate = function (models) {
    Backendactor.belongsToMany(models.Backenduser, 
      {
        through: models.BackendUserActorMapping,
        foreignKey: {
          name: "backendactor_id",
        },
      }
    );

    Backendactor.hasMany(models.BackendUserActorMapping, {
      foreignKey: {
        name: "backendactor_id",
      },
    });
  };
  
  return Backendactor;
};
