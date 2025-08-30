const express = require("express");
const router = express.Router();
const logVisits = require("../controllers/visit");

router.post("/log-visit", logVisits);

module.exports = router;
