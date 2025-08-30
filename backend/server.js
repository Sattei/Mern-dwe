const connectToMongo = require("./db");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const router = require("./routes/visited");

connectToMongo();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/logged-visit", router);

// app.get("/ping", (req, res) => {
//   res.send("Hello World");
// });

app.listen(process.env.PORT, () => {
  console.log(`CONNECTED at PORT : ${process.env.PORT}`);
});
