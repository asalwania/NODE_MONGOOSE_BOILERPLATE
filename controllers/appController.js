const db = require("../models");
const { Op, Sequelize } = require("sequelize");

// create main model
const Availabity = db.availabity;
const TimeSlots = db.timeSlots;
const Bookings = db.bookings;

/**
 * @api {POST} /addAvailablity
 * @apiBody {json} Sample:
 * {
 *  "doctor_id": 1,
    "startTime": "2022-06-17T11:00:00.000Z",
    "endTime":   "2022-06-17T15:00:00.000Z" ,
    "patient_count": 20
 * }
 */
const addAvailabity = async (req, res) => {
  try {
    const { doctor_id, startTime, endTime, patient_count } = req.body;
    const totalMinutes = parseInt(
      Math.abs(new Date(endTime) - new Date(startTime)) / 60000
    );
    const minutesPerPatient = parseInt(totalMinutes / patient_count); // remaining totalMinutes%patient_count minutes not used here

    const timeSlots = [];
    let slotStartTime = new Date(startTime);
    for (let i = 0; i < patient_count; i++) {
      const slotEndTime = new Date(
        slotStartTime.getTime() + minutesPerPatient * 60000
      );
      timeSlots.push({
        doctor_id,
        slotStartTime: slotStartTime.toISOString(),
        slotEndTime: slotEndTime.toISOString(),
      });
      slotStartTime = slotEndTime;
    }

    const info = {
      doctor_id,
      startTime,
      endTime,
      patient_count,
      timeSlots,
    };

    const availabity = await Availabity.create(info, {
      include: [
        {
          association: Availabity.TimeSlots,
        },
      ],
    });
    res.status(200).send(availabity);
  } catch (error) {
    console.log("ERROR: ", error);
    res.send(error);
  }
};


/**
 * @api {POST} /addAvailablity
 * @apiBody {json} Sample:
 * {
 *  "doctor_id":1,
    "appointment_date":"21-10-2022",
    "doctor_time_slot_id":1,
    "patient_count":2
 * }
 */
const getSlots = async (req, res) => {
  try {
    const {doctor_time_slot_id, patient_count } =
      req.body;

    const availableSlot = await TimeSlots.findOne({
      include: {
        model: Bookings,
        required: false,
        attributes: [],
      },
      where: [
        Sequelize.where(Sequelize.col("booking.doctor_time_slot_id"), null),
        Sequelize.where(Sequelize.col("timeSlot.id"), doctor_time_slot_id),
      ],
    });
    let fetchLimit = patient_count;
    const result = [];
    if (availableSlot) {
      fetchLimit--;
      result.push(availableSlot);
    }

    const leftavailableSlot = await TimeSlots.findAll({
      include: {
        model: Bookings,
        required: false,
        attributes: [],
      },
      where: [
        Sequelize.where(Sequelize.col("booking.doctor_time_slot_id"), null),
        Sequelize.where(Sequelize.col("timeSlot.id"), {
          [Op.ne]: doctor_time_slot_id,
        }),
      ],
      limit: fetchLimit,
    });

    result.push(leftavailableSlot);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  addAvailabity,
  getSlots,
};
