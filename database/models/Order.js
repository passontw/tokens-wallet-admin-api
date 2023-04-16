const baseSchema = require("../schemas/baseSchema");

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", 
    {
      ...baseSchema,
      status: {
        field: 'status',
        type: DataTypes.ENUM([0, 1, 2, 3, 4]),
        default: 0,
        comment: '掛單狀態: 0: 等待匯款, 1: 已匯款未放行, 2: 已放行, 3: 買家已取消, 4: 賣家已取消',
      },
      amount: {
        filed: 'amount',
        type: DataTypes.DECIMAL(18, 0),
        allowNull: false,
        comment: '進行交易的數量',
      },
      finishAt: {
        filed: 'finish_at',
        type: DataTypes.DATE,
        allowNull: true,
        comment: '完成交易的時間',
      },
  }, {
    sequelize,
    tableName: "orders",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.User, {
      as: "users",
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
    });
  };
  return Order;
};
