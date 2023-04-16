const Backendactor = require("./Backendactor");
const Backenduser = require("./Backenduser");

module.exports = (sequelize, DataTypes) => {
  const BackendUserActorMapping = sequelize.define("BackendUserActorMapping", 
    {
      backenduserId: {
        filed: 'backenduser_id',
        type: DataTypes.INTEGER,
        references: {
          model: Backenduser,
          key: 'id'
        },
      },
      backendactorId: {
        filed: 'backendactor_id',
        type: DataTypes.INTEGER,
        references: {
          model: Backendactor,
          key: 'id'
        },
      },
    }, {
    sequelize,
    tableName: "banckend_user_actor_mapping",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  BackendUserActorMapping.associate = function (models) {
    BackendUserActorMapping.belongsTo(models.Backendactor, {

    });
    BackendUserActorMapping.belongsTo(models.Backenduser);
  };

  return BackendUserActorMapping;
};
