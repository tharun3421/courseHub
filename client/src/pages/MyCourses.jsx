import { useEffect, useState } from "react";
import API from "../services/api";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/my-courses").then(res => setCourses(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Courses</h2>

      {courses.map((c, i) => (
        <div
          key={i}
          className="bg-white p-4 mb-4 rounded-lg shadow flex justify-between"
        >
          <div>
            <h3 className="font-bold">{c.title}</h3>
            <p className="text-sm text-gray-600">
              Subscribed on {new Date(c.subscribedAt).toDateString()}
            </p>
          </div>
          <span className="font-bold text-primary">
            ₹{c.pricePaid}
          </span>
        </div>
      ))}
    </div>
  );
}
