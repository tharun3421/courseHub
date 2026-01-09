const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const subscribeRoutes = require("./routes/subscribe");
const myCoursesRoutes = require("./routes/myCourses");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/subscribe", subscribeRoutes);
app.use("/my-courses", myCoursesRoutes);

app.listen(process.env.PORT ||5000, () => console.log(`Server running on port ${process.env.PORT}`));
