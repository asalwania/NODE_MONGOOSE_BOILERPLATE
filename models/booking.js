module.exports = function (sequelize, DataTypes) {
  const Bookings = sequelize.define("bookings", {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointmentDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Bookings;
};
