const baseSchema = require("../schemas/baseSchema");
const { saltHashPassword } = require('../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const Backenduser = sequelize.define("Backenduser",
    {
      ...baseSchema,
      account: {
        filed: 'account',
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        length: 50,
      },
      name: {
        filed: 'name',
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        length: 50,
      },
      password: {
        filed: 'password',
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        length: 200,
        set(value) {
          this.setDataValue('password', saltHashPassword(value));
        }
      },
    }, {
    sequelize,
    tableName: "backend_users",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  Backenduser.associate = function (models) {
    Backenduser.belongsToMany(models.Backendactor, {
      as: "backendactors",
      through: models.BackendUserActorMapping,
      foreignKey: {
        name: "backenduser_id",
      },
    });

    Backenduser.hasMany(models.BackendUserActorMapping, {
      foreignKey: {
        name: "backenduser_id",
      },
    });
  };

  return Backenduser;
};
