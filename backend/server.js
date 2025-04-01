require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

console.log("MongoDB URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ++++++++++++++++++++++++++++++++++++"))
  .catch(err => console.error("MogoDB connection error ---------------- :", err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

const taskRoutes = require("./routes/taskRoutes");
app.use("/api", taskRoutes);
