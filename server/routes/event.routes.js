const express = require("express");
const { createEvent } = require("../controllers/event.controller");
const { upload } = require("../middlewares/multer");

const router = express.Router();

router.post(
  "/create_event",
  upload.fields([{ name: "image", maxCount: 1 }]),
  createEvent
);

module.exports = router;
