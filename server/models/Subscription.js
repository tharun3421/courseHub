const mongoose = require("mongoose");

// const SubscriptionSchema = new mongoose.Schema({
//   userId: mongoose.Schema.Types.ObjectId,
//   courseId: mongoose.Schema.Types.ObjectId,
//   pricePaid: Number,
//   subscribedAt: Date
// });

// module.exports = mongoose.model("Subscription", SubscriptionSchema);


const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  pricePaid: Number,
  subscribedAt: Date
});

subscriptionSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
