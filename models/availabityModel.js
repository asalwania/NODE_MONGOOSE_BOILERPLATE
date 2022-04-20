
module.exports = function (sequelize, DataTypes) {
  const Availabity = sequelize.define("availabity", {
    doctor_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patient_count: {
      type: DataTypes.INTEGER,
    },
  });
  return Availabity;
};
