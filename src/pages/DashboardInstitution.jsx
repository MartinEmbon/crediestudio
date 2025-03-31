import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardInstitution.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import NavbarLoggedInstitution from "../NavbarLoggedInstitution";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
const DashboardInstitution = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  
  // Mock Data: Courses
  const [courses, setCourses] = useState([
    { id: 1, name: "Curso de Programación Web", students: 120 },
    { id: 2, name: "Gestión Empresarial", students: 85 },
    { id: 3, name: "Finanzas para Emprendedores", students: 65 }
  ]);

  const onLogout = () => {
    dispatch(setUser (null)); // Clear user info from Redux
    navigate("/signin"); // Redirect to login page
  };

  // Handle Course Creation (Future Modal)
  const handleAddCourse = () => {
    console.log("Open add course modal");
  };

  // Navigate to Student Applications Page
  const handleViewApplications = () => {
    navigate("/applications");
  };

  return (
    <>
     <NavbarLoggedInstitution onLogout={onLogout}/>
  
    <div className="dashboard-container">
      {/* <header className="dashboard-header">
        <h1>Panel de Institución</h1>
        <button className="btn logout-btn" onClick={() => navigate("/")}>
          Cerrar Sesión
        </button>
      </header> */}

      <main className="dashboard-main">
        {/* Overview Section */}
        <section className="overview">
          <h2>Resumen</h2>
          <p>📚 Cursos registrados: {courses.length}</p>
          <p>👨‍🎓 Estudiantes totales: {courses.reduce((acc, c) => acc + c.students, 0)}</p>
        </section>

        {/* Course Management */}
        <section className="courses">
          <h2>Mis Cursos</h2>
          <button className="btn add-course-btn" onClick={handleAddCourse}>+ Agregar Curso</button>
          <ul>
            {courses.map((course) => (
              <li key={course.id}>
                <span>{course.name} ({course.students} estudiantes)</span>
                <button className="btn edit-btn">Editar</button>
                <button className="btn delete-btn">Eliminar</button>
              </li>
            ))}
          </ul>
        </section>

        {/* Student Applications */}
        <section className="applications">
          <h2>Solicitudes de Estudiantes</h2>
          <button className="btn view-btn" onClick={handleViewApplications}>
            Ver Solicitudes
          </button>
        </section>

        {/* Financial Reports */}
        <section className="finance">
          <h2>Finanzas</h2>
          <p>💰 Ingresos estimados: $15,000</p>
          <button className="btn finance-btn">Ver Reportes</button>
        </section>

      </main>
    </div>
    </>
  );
};

export default DashboardInstitution;
