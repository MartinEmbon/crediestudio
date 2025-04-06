// MyProducts.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavbarLoggedIn from "../NavbarLoggedUser";
import Footer from "../components/Footer";
import axios from "axios";
import "../styles/MyProducts.css"; // Create your CSS for card styling

const MyProducts = () => {
  const userInfo = useSelector((state) => state.user.userInfo?.userInfo);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://get-loan-decissions-589432081267.us-central1.run.app`,
          {
            params: { studentEmail: userInfo.email },
          }
        );
        setCourses(response.data || []);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    };

    if (userInfo?.email) {
      fetchCourses();
    }
  }, [userInfo]);

  return (
    <>
      <NavbarLoggedIn />
      <div className="products-container">
        <h1>Mis Cursos</h1>
        <div className="course-cards">
          {courses.map((course, index) => (
            <div
              key={index}
              className="course-card"
              onClick={() => navigate(`/mis-productos/${index}`, { state: { course } })}
            >
              <h3>{course.courseName}</h3>
              {/* <p>Total: ${course.finalPrice}</p> */}
              <div className="progress-bar-container">
  <div
    className="progress-bar-fill"
    style={{
      width: `${Math.min((course.paidAmount / course.totalPrice) * 100, 100)}%`,
      backgroundColor: course.paidAmount >= course.totalPrice ? "#4caf50" : "#ffc107",
    }}
  />
</div>
<p className="progress-text">
  {course.paidAmount >= course.totalPrice ? "✅ Completado" : "⏳ En curso"}
</p>            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyProducts;
