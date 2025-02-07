const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const connectCloud = require("./config/cloudinary");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const eventRoutes = require("./routes/event.routes");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

connectDB();
connectCloud();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/event", eventRoutes);

app.get("/", (req, res) => {
  res.send("Event Management API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
