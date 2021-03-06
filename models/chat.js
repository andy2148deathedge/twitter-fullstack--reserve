module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    'Chat',
    {
      text: DataTypes.TEXT,
      UserId: DataTypes.INTEGER
    },
    {}
  )
  Chat.associate = function (models) {
    Chat.belongsTo(models.User)
  }
  return Chat
}
