const baseSchema = require("../schemas/baseSchema");

module.exports = (sequelize, DataTypes) => {
  const PenddingOrder = sequelize.define("PenddingOrder", 
    {
      ...baseSchema,
      type: {
        field: 'type',
        type: DataTypes.ENUM([0, 1]),
        default: 0,
        comment: '掛單類型: 0: 買幣, 1: 賣幣',
      },
      status: {
        field: 'status',
        type: DataTypes.ENUM([0, 1, 2, 3, 4]),
        default: 0,
        comment: '掛單狀態: 0: 掛賣中, 1: 已暫停掛賣, 2: 以取消掛單, 3: 已刪除掛單',
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
      buyProcessingAmount: {
        filed: 'buy_processing_amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '購買進行交易的數量',
      },
      buyCancleAmount: {
        filed: 'buy_cancle_amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '購買取消的數量',
      },
      buyDoneAmount: {
        filed: 'buy_done_amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '購買交易成功的數量',
      },
      sellProcessingAmount: {
        filed: 'sell_processing_amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '賣進行交易的數量',
      },
      sellCancleAmount: {
        filed: 'sell_cancle_amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '賣取消的數量',
      },
      sellDoneAmount: {
        filed: 'sell_done_amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '賣交易成功的數量',
      },
  }, {
    sequelize,
    tableName: "pendding_orders",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  PenddingOrder.associate = function (models) {
    // associations can be defined here
    PenddingOrder.belongsTo(models.User, {
      as: "users",
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return PenddingOrder;
};
