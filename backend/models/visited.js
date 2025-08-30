const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Visit = mongoose.model("Visited", VisitSchema);
Visit.createIndexes();

module.exports = Visit;
