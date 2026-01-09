const router = require("express").Router();
const Subscription = require("../models/Subscription");
const Course = require("../models/Course");
const auth = require("../middleware/authMiddleware");

// router.get("/", auth, async (req, res) => {
//   const subs = await Subscription.find({ userId: req.userId });

//   const data = await Promise.all(
//     subs.map(async sub => {
//       const course = await Course.findById(sub.courseId);
//       return {
//         title: course.title,
//         pricePaid: sub.pricePaid,
//         subscribedAt: sub.subscribedAt
//       };
//     })
//   );

//   res.json(data);
// });

router.get("/", auth, async (req, res) => {
  const subscriptions = await Subscription.find({
    userId: req.userId
  }).populate("courseId");

  const data = subscriptions.map(sub => ({
    _id: sub.courseId._id,          
    title: sub.courseId.title,
    image: sub.courseId.image,      
    pricePaid: sub.pricePaid,
    subscribedAt: sub.subscribedAt
  }));

  res.json(data);
});


module.exports = router;
