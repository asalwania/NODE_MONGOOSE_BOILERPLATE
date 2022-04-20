
module.exports = function (sequelize, DataTypes) {
    const TimeSlot = sequelize.define("timeSlot", {
      doctor_id: {
        type: DataTypes.INTEGER,
      },
      // doctor_availability_id:{
      //     type:DataTypes.INTEGER
      // },
      slotStartTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slotEndTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return TimeSlot;
  };
  