import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [promo, setPromo] = useState("");
  const [valid, setValid] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await API.get(`/courses/${id}`);
        setCourse(res.data);
        setIsSubscribed(res.data.isSubscribed || false);
      } catch {
        toast.error("Failed to load course");
      }
    };

    fetchCourse();
  }, [id]);
console.log(isSubscribed)
  const subscribe = async () => {
    if (isSubscribed) {
      toast.error("You already subscribed to this course");
      return;
    }

    if (course.price > 0 && !valid) {
      toast.error("Please apply a valid promo code");
      return;
    }

    try {
      await API.post("/subscribe", {
        courseId: id,
        promoCode: promo
      });

      toast.success("Course subscribed successfully ✅");
      setIsSubscribed(true);
      navigate("/my-courses");

    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Please login to subscribe");
        navigate("/login");
        return;
      }

      toast.error(
        error.response?.data?.msg || "Something went wrong"
      );
    }
  };

  if (!course) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 mt-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

      <p className="text-gray-600 mb-6">
        {course.description}
      </p>

      <p className="text-xl font-bold mb-4">
        {course.price === 0 ? "FREE" : `₹${course.price}`}
      </p>

      {course.price > 0 && !isSubscribed && (
        <div className="flex gap-2 mb-4">
          <input
            className="border p-2 rounded w-full"
            placeholder="Use BFSALE25 Promo for 50%"
            value={promo}
            onChange={e => setPromo(e.target.value)}
          />
          <button
            onClick={() => setValid(promo === "BFSALE25")}
            className="bg-gray-800 text-white px-4 rounded"
          >
            Apply
          </button>
        </div>
      )}

      <button
        disabled={
          isSubscribed || (course.price > 0 && !valid)
        }
        onClick={subscribe}
        className={`w-full py-3 rounded-lg text-white ${
          isSubscribed || (course.price > 0 && !valid)
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-lime-600"
        }`}
      >
        {isSubscribed ? "Already Subscribed ✅" : "Subscribe"}
      </button>
    </div>
  );
}
