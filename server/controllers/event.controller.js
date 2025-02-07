const Event = require("../models/event.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

exports.createEvent = async (req, res) => {
  try {
    const { id } = req.user;
    // const { id } = req.params;
    const {
      title,
      description,
      audienceType,
      eventMode,
      location,
      contact,
      date,
      time,
      price,
      quantity,
      sponsors,
    } = req.body;

    if (
      !title ||
      !description ||
      !audienceType ||
      !eventMode ||
      !location ||
      !contact ||
      !date ||
      !time ||
      !price ||
      !quantity
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isUser = await User.findById(id);
    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let sponsorsArray = [];
    if (sponsors) {
      sponsorsArray = sponsors.split(",").map((sponsor) => sponsor.trim());
    }

    // image url generation
    if (!req.files || !req.files.image || req.files.image.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const imageFile = req.files.image[0];
    const result = await cloudinary.uploader.upload(imageFile.path, {
      folder: "event_management",
      resource_type: "image",
    });
    const imageUrl = result.secure_url;

    const eventDateTime = new Date(`${date}T${time}:00Z`);

    const newEvent = await Event.create({
      hostName: id,
      attendees: [],
      title,
      description,
      image: imageUrl,
      targetAudience: audienceType,
      eventMode,
      eventLocation: location,
      eventContact: contact,
      eventDateTime,
      ticketPrice: Number(price),
      ticketQuantity: Number(quantity),
      sponsors: sponsorsArray,
    });

    await User.findByIdAndUpdate(id, {
      $push: { eventsCreated: newEvent._id },
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating an event",
      error: error.message,
    });
  }
};

exports.enrollEvent = async (req, res) => {
  try {
    const { id } = req.user;
    const { eventId } = req.params;
    // const { id } = req.params;

    const { firstName, lastName, email, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // checking if the user is already enrolled for the event
    const alreadyEnrolled = await Event.findOne({
      _id: req.params.eventId,
      attendees: id,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "You have already enrolled for this event",
      });
    }

    // new attendee and appending the event's attendees array
    const newAttendee = await Event.findByIdAndUpdate(
      eventId,
      { $push: { attendees: id } },
      { new: true }
    );

    // updating the user's eventsEnrolled array
    await User.findByIdAndUpdate(
      id,
      { $push: { eventsEnrolled: eventId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while enrolling an event",
      error: error.message,
    });
  }
};

exports.displayAllEvent = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while displaying all events",
      error: error.message,
    });
  }
};

exports.displaySingleEvent = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while displaying an event",
      error: error.message,
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating an event",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting an event",
      error: error.message,
    });
  }
};
