const appController = require("../controllers/appController");

const router = require("express").Router();

router.post("/addAvailablity", appController.addAvailabity);
router.post("/getSlots", appController.getSlots);

module.exports = router;
