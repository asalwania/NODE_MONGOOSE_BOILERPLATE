const dbConfig = require("../dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connected...");
  })
  .catch((err) => {
    console.log("ERROR ", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.availabity = require("./availabityModel.js")(sequelize, DataTypes);
db.timeSlots = require("./timeslot")(sequelize, DataTypes);

db.bookings = require("./booking")(sequelize, DataTypes);

// relation 1:M
db.availabity.TimeSlots=db.availabity.hasMany(db.timeSlots, {
  foreignKey: "doctor_availability_id",
});

// relation 1:1
db.timeSlots.hasOne(db.bookings,{
  foreignKey:'doctor_time_slot_id'
})

db.sequelize.sync({ force: false }).then(() => {
  console.log("Resync done!!!!");
});

module.exports = db;
