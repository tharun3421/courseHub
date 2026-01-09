import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
// import {courses} from "../data/coures.js"

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    API.get("/courses").then(res => setCourses(res.data));

  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {courses.map(c => (
        <div
          key={c._id}
          className="bg-white rounded-xl shadow-md overflow-hidden "
        >
           <img
            src={c.image}
            alt={c.title}
            className="w-full h-42 object-cover rounded"
/>
          <div className="p-4">
            <h3 className="font-bold text-lg">{c.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {c.description}
            </p>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-primary">
                {c.price === 0 ? "FREE" : `₹${c.price}`}
              </span>
              <Link
                to={`/course/${c._id}`}
                className="text-primary font-semibold"
              >
                View →
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
