const express = require("express");
const {
  createEvent,
  enrollEvent,
  displayAllEvent,
  displaySingleEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const { upload } = require("../middlewares/multer");
const { userAuthenticate } = require("../middlewares/authenticate");

const router = express.Router();

router.post(
  "/create_event",
  userAuthenticate,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createEvent
);
router.post("/enroll_event/:eventId", userAuthenticate, enrollEvent);

router.get("/display_events", userAuthenticate, displayAllEvent);
router.get(
  "/display_single_event/:eventId",
  userAuthenticate,
  displaySingleEvent
);

router.delete("/delete_event/:eventId", userAuthenticate, deleteEvent);

module.exports = router;
