const Event = require("../models/event.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;

exports.createEvent = async (req, res) => {
  try {
    const { id } = req.user;
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

    const eventDateTime = `${date} ${time}`;

    const newEvent = await Event.create({
      hostId: id,
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
    const { id, firstName, lastName, email } = req.user;
    const { eventId } = req.params;

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

    const newAttendee = await Event.findByIdAndUpdate(
      eventId,
      { $push: { attendees: id } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      id,
      { $push: { eventsEnrolled: eventId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Enrolled successfully",
      data: newAttendee,
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
    // const { id } = req.user;
    // const isUser = await User.findById(id);
    // if (!isUser)
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });

    const allEvents = await Event.find();
    res.status(200).json({
      success: true,
      message: "All events displayed successfully",
      data: allEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while displaying all events",
      error: error.message,
    });
  }
};

exports.displayMyEvents = async (req, res) => {
  try {
    const { id } = req.user;

    const myEvents = await Event.find({ hostName: id }).sort({
      eventDateTime: -1,
    });

    if (!myEvents.length) {
      return res.status(200).json({
        success: true,
        message: "No events found",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      data: myEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving events",
      error: error.message,
    });
  }
};

exports.displaySingleEvent = async (req, res) => {
  try {
    // const { id } = req.user;
    const { eventId } = req.params;

    // const isUser = await User.findById(id);
    // if (!isUser)
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });

    const isEvent = await Event.findById(eventId);
    if (!isEvent)
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });

    const eventDetail = await Event.findOne({ _id: eventId });
    res.status(200).json({
      success: true,
      message: "Event displayed successfully",
      data: eventDetail,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while displaying an event",
      error: error.message,
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.user;
    const { eventId } = req.params;

    const isUser = await User.findById(id);
    if (!isUser)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const isEvent = await Event.findById(eventId);
    if (!isEvent)
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });

    if (isEvent.hostName.toString() !== id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this event",
      });
    }
    await Event.findByIdAndDelete(eventId);
    await User.updateMany(
      { eventsEnrolled: eventId },
      { $pull: { eventsEnrolled: eventId } }
    );

    await User.findByIdAndUpdate(id, {
      $pull: { eventsCreated: eventId },
    });

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting an event",
      error: error.message,
    });
  }
};
