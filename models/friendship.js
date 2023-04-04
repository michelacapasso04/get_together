module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define(
    "Friendship",

    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,},

      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
      },
      FriendId: {
        type: DataTypes.INTEGER,
        primaryKey: false,
      },
      status: { type: DataTypes.STRING} ,
    },
    {}
  );
  Friendship.associate = function (models) {
    Friendship.belongsTo(models.User, { foreignKey: "UserId" });
    Friendship.belongsTo(models.User, { foreignKey: "FriendId" });
  };
  //funzione per aggiungere un amico
  Friendship.friendRequest = async function (fromId, toId) {
    try {
      //creo la relazione, pending indica se la richiesta è accettata o meno
      await Friendship.create({
        userId: toId,
        friendId: fromId,
        pending: true,
      });
      //TODO emetti notifica
    } catch (e) {
      throw e;
    }
  };
  Friendship.acceptRequest = async function (fromId, toId) {
    try {
      const relation = await Friendship.findOne({
        where: {
          UserId: fromId,
          FriendId: toId,
        },
      });
      relation.pending = false;
      await relation.save();
      await Friendship.create({
        UserId: toId,
        FriendId: fromId,
        pending: false,
      });
    } catch (e) {
      throw e;
    }
  };

  return Friendship;
};
