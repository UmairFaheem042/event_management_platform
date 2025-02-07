const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.json());

// connectDB();

app.use("/api/v1/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Event Management API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
