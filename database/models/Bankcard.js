const baseSchema = require("../schemas/baseSchema");

module.exports = (sequelize, DataTypes) => {
  const Bankcard = sequelize.define("Bankcard",
    {
      ...baseSchema,
      name: {
        filed: 'name',
        type: DataTypes.STRING,
        allowNull: false,
        length: 20,
      },
      cardNumber: {
        field: 'card_number',
        type: DataTypes.STRING,
        allowNull: false,
        comment: '銀行卡號',
      },
      status: {
        field: 'status',
        type: DataTypes.ENUM([0, 1]),
        default: 1,
        comment: '銀行卡狀態: 0: 凍結, 1: 啟用',
        get() {
          const rawValue = this.getDataValue('status');
          return parseInt(rawValue);
        }
      },
      bankName: {
        field: 'bank_name',
        type: DataTypes.STRING,
        allowNull: false,
        comment: '銀行名稱',
        length: 20,
      },
      branchName: {
        filed: 'branch_name',
        type: DataTypes.STRING,
        allowNull: false,
        length: 20,
      },
    }, {
    sequelize,
    tableName: "bank_cards",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  Bankcard.associate = function (models) {
    // associations can be defined here
    Bankcard.belongsTo(models.User, {
      as: "user",
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });

    // User.hasMany(models.Comment, {
    //   foreignKey: 'userId',
    //   as: 'comments',
    //   onDelete: 'CASCADE',
    // });
  };
  return Bankcard;
};
