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

const getLogs = async (req, res) => {
  try {
    const { search = "", sort = "desc" } = req.query;

    const filter = search
      ? {
          $or: [
            //$or = TELLS MONGODB : MATCH ANY ONE OF THESE CONDITIONS
            { url: { $regex: search, $options: "i" } }, // regex = USED FOR PATTERN MATCH, LOOK FOR search TERM ANYWHERE IN THE STRING
            { title: { $regex: search, $options: "i" } }, // options i MAKE REGEX CASE INSENSITIVE
          ],
        }
      : {};

    const sortOrder = sort === "asc" ? 1 : -1;

    const foundLogs = await Visit.find(filter).sort({ date: sortOrder }).lean();

    res.json({ foundLogs, total: foundLogs.length });
  } catch (error) {
    console.error(`ERROR : ${error} HAS OCCURRED`);
    res.status(500).json({ error: "FAILED TO FETCH LOGS" });
  }
};

module.exports = { logVisits, getLogs };
