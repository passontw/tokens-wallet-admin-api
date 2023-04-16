const baseSchema = require("../schemas/baseSchema");
const { saltHashPassword } = require('../../helpers/utils');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", 
    {
      ...baseSchema,
      type: {
        field: 'type',
        type: DataTypes.ENUM([0, 1]),
        defaultValue: 0,
      },
      status: {
        field: 'status',
        type: DataTypes.ENUM([0, 1]),
        defaultValue: 1,
      },
      orderStatus: {
        field: 'order_status',
        type: DataTypes.ENUM([0, 1]),
        defaultValue: 1,
        comment: '0: 停用, 1: 啟用',
      },
      transationStatus: {
        field: 'transation_status',
        type: DataTypes.ENUM([0, 1]),
        defaultValue: 1,
        comment: '0: 停用, 1: 啟用',
      },
      account: {
        filed: 'account',
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        length: 50,
      },
      email: {
        filed: 'email',
        type: DataTypes.STRING,
        require: true,
        allowNull: false,
        length: 50,
      },
      phone: {
        filed: 'phone',
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
      loginTime: {
        filed: 'login_time',
        type: DataTypes.DATE,
        allowNull: true,
        default: null,
        length: 20,
      },
      referralCode: {
        filed: 'referral_code',
        type: DataTypes.STRING,
        allowNull: false,
        length: 10,
      },
      transactionCode: {
        filed: 'transaction_code',
        type: DataTypes.STRING,
        allowNull: false,
        length: 200,
        set(value) {
          this.setDataValue('transactionCode', saltHashPassword(value));
        }
      },
      markup: {
        filed: 'markup',
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        length: 10,
      },
      notificationToken: {
        field: 'notification_token',
        type: DataTypes.STRING,
        allowNull: true,
        length: 200,
      },
  }, {
    sequelize,
    tableName: "users",
    timestamps: false,
    underscored: true,
    freezeTableName: true,
  });

  User.associate = function (models) {
    // associations can be defined here
    User.hasOne(models.Wallet, {
      as: "wallets",
      onDelete: 'CASCADE',
      foreignKey: {
        name: "user_id",
      },
    });

    User.hasMany(models.Bankcard, {
      as: 'bankcards',
      onDelete: 'CASCADE',
      foreignKey: {
        name: "user_id",
      },
    });
  };
  return User;
};
