// const router = require("express").Router();
// const Course = require("../models/Course");

// router.get("/", async (_, res) => {
//   const courses = await Course.find();
//   res.json(courses);
// });

// router.get("/:id", async (req, res) => {
//   const course = await Course.findById(req.params.id);
//   res.json(course);
// });

// module.exports = router;
const router = require("express").Router();
const Course = require("../models/Course");
const Subscription = require("../models/Subscription");
const auth = require("../middleware/authMiddleware");

// GET ALL COURSES
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// GET SINGLE COURSE + SUBSCRIPTION STATUS
router.get("/:id", async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res.status(404).json({ msg: "Course not found" });
  }

  let isSubscribed = false;

  // 🔥 check subscription only if token exists
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
      // reuse auth middleware logic
      await auth(req, res, async () => {
        const sub = await Subscription.findOne({
          userId: req.userId,
          courseId: course._id
        });

        isSubscribed = !!sub;

        res.json({
          ...course.toObject(),
          isSubscribed
        });
      });
      return;
    } catch {
      // ignore token errors
    }
  }

  // 🔹 logged out user
  res.json({
    ...course.toObject(),
    isSubscribed: false
  });
});

module.exports = router;
