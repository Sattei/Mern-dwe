const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
});

const Visit = mongoose.model("Visit", VisitSchema);

module.exports = Visit;
