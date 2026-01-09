const router = require("express").Router();
const Course = require("../models/Course");
const Subscription = require("../models/Subscription");
const auth = require("../middleware/authMiddleware");




router.post("/", auth, async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const alreadySubscribed = await Subscription.findOne({
      userId: req.userId,
      courseId
    });

    if (alreadySubscribed) {
      return res.status(400).json({
        msg: "You already subscribed to this course"
      });
    }

    let pricePaid = 0;

    if (course.price > 0) {
      if (promoCode !== "BFSALE25") {
        return res.status(400).json({ msg: "Invalid Promo Code" });
      }
      pricePaid = course.price * 0.5;
    }

    await Subscription.create({
      userId: req.userId,
      courseId,
      pricePaid,
      subscribedAt: new Date()
    });

    res.json({ msg: "Subscribed Successfully" });

  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;