const express = require("express");
const router = express.Router();
const { logVisits, getLogs } = require("../controllers/visit");

router.post("/log-visit", logVisits);
router.get("/get-logs", getLogs);

module.exports = router;
