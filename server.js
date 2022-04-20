const express = require("express");
// const cors = require("cors");

const app = express();

// middleware

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const router = require("./routes/availabityRoute");
app.use("/", router);

//port

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${8080}`);
});
// 2. Create another API which will take following parameters
// appointment_date
// doctor_id
// doctor_time_slot_id
// no_of_patients

// This API will fetch the slot from the doctor_time_slots table associated with doctor_time_slot_id passed as input and other next available time slots for the remaining number of patients(i.e, number_of_patients -1). A slot is to be considered as “available” if “id” of doctor_time_slots table does not exist in patient_booking_slots table’s doctor_time_slot_id field. For example,
// If appointment_date=2020-08-20,doctor_time_slot_id=1 and no_of_patient=3 then
// the result will be slots having slot_id=2 and also 2 other next available slots for the remaining 2 patients.
