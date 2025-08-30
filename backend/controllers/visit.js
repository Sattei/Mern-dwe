const Visit = require("../models/visited");

const logVisits = async (req, res) => {
  try {
    const { url, title } = req.body;

    if (!url) {
      return res.status(400).json({ message: "MISSING URL" });
    }

    const newVisit = await Visit.create({ url, title });
    res.status(201).json({
      message: "NEW VISIT",
      data: newVisit,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
  }
};

module.exports = logVisits;
