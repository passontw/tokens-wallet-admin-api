const baseSchema = require("../schemas/baseSchema");

module.exports = (sequelize, DataTypes) => {
  const Merchant = sequelize.define("Merchant", 
    {
      ...baseSchema,
      buyFeeType: {
        field: 'buy_fee_type',
        type: DataTypes.ENUM([0, 1]),
        default: 0,
        comment: '購買的手續費類型',
      },
      sellFeeType: {
        field: 'sell_fee_type',
        type: DataTypes.ENUM([0, 1]),
        default: 0,
        comment: '賣的手續費類型',
      },
      telegram: {
        field: 'telegram',
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Telegram ID',
      },
      contactor: {
        filed: 'contactor',
        type: DataTypes.STRING,
        allowNull: false,
        length: 50,
      },
      buyPercentageFee: {
        filed: 'buy_percentage_fee',
        type: DataTypes.JSON,
        allowNull: false,
      },
      buyLadderFee: {
        filed: 'buy_ladder_fee',
        type: DataTypes.JSON,
        allowNull: false,
      },
      sellPercentageFee: {
        filed: 'sell_percentage_fee',
        type: DataTypes.JSON,
        allowNull: false,
      },
      sellLadderFee: {
        filed: 'sell_ladder_fee',
        type: DataTypes.JSON,
        allowNull: false,
      },
  }, {
    sequelize,
    tableName: "merchants",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  Merchant.associate = function (models) {
    // associations can be defined here
    Merchant.belongsTo(models.User, {
      as: "users",
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Merchant;
};
