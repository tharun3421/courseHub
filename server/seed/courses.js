const mongoose = require("mongoose");
const Course = require("../models/Course");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const courses = [
  {
    title: "React Basics",
    description:
      "Learn the fundamentals of React including components, props, state, and hooks. Perfect for beginners.",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Advanced React",
    description:
      "Deep dive into advanced React concepts like performance optimization, custom hooks, and best practices.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Node.js & Express Mastery",
    description:
      "Build scalable backend applications using Node.js, Express, REST APIs, and JWT authentication.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "MongoDB for Developers",
    description:
      "Master MongoDB queries, aggregation pipelines, schema design, and real-world database optimization.",
    price: 0,
    image:
      "https://images.unsplash.com/photo-1669023414166-a4cc7c0fe1f5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aHRtbHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Full-Stack System Design",
    description:
      "Learn how to design scalable systems, APIs, databases, and handle real-world traffic challenges.",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
  },
];


async function seedCourses() {
  await Course.deleteMany();
  await Course.insertMany(courses);
  console.log("Courses seeded successfully");
  process.exit();
}

seedCourses();
