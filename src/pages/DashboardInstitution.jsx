import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/DashboardInstitution.css";
import NavbarLoggedInstitution from "../NavbarLoggedInstitution";
import { setUser } from "../redux/userSlice";
import axios from "axios"; // Import Axios


const DashboardInstitution = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    // Access email directly from Redux
    const [courses, setCourses] = useState([]);

    const contactInstitutionEmail = useSelector((state) => state.user?.email) || localStorage.getItem("userEmail");

    // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `https://list-institution-courses-589432081267.us-central1.run.app?email=${contactInstitutionEmail}`
        );
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        alert("Error al cargar los cursos.");
      }
    };

    if (contactInstitutionEmail) {
      fetchCourses();
    }
  }, [contactInstitutionEmail]);

  
  const [showEditModal, setShowEditModal] = useState(false);
  const [courseId, setCourseId] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [students, setStudents] = useState("");
    const [price, setPrice] = useState(""); // Added price state

    const handleEditCourse = (course) => {
        setCourseId(course.id);
        setCourseName(course.name);
        // setStudents(course.students);
        setPrice(course.price); // Set the price for editing

        setShowEditModal(true);
      };

      const handleDeleteCourse = async (courseId) => {
        try {
          const response = await axios.delete(
            `https://delete-course-589432081267.us-central1.run.app?email=${contactInstitutionEmail}&courseId=${courseId}`
          );
      
          if (response.status === 200) {
            // Successfully deleted, update the course list
            setCourses(courses.filter((course) => course.id !== courseId));
            alert('Curso eliminado con éxito');
          }
        } catch (error) {
          console.error("Error deleting course:", error);
          alert("Error al eliminar el curso.");
        }
      };

      

      const handleUpdateCourse = async () => {
        if (!courseName || price <= 0) {
          alert("Todos los campos son obligatorios y el precio debe ser positivo.");
          return;
        }
    
        try {
          const response = await axios.put(
            "https://update-institution-courses-589432081267.us-central1.run.app",
            {
              courseId,
              courseName,
            //   students: Number(students),
              contactInstitutionEmail,
              price: Number(price), // Include the price in the update request

            }
          );
    
          //optional
        //   const updatedCourses = courses.map(course =>
        //     course.id === courseId ? { ...course, name: courseName, price: Number(price) } : course
        //   );
          
          // Update the course locally
          const updatedCourses = courses.map((course) =>
            course.id === courseId 
          ? { ...course, name: courseName, price: Number(price) } : course
        //   ? { ...course, name: courseName, students: Number(students), price: Number(price) } : course

          );
          setCourses(updatedCourses);
    
          handleCloseModal();
        } catch (error) {
          console.error("Error updating course:", error);
          alert("Error al actualizar el curso.");
        }
      };
    const onLogout = () => {
      dispatch(setUser(null));
      navigate("/signin");
    };
  
    // Open the modal
    const handleAddCourse = () => {
      setShowModal(true);
    };
  
    // Close the modal
    const handleCloseModal = () => {
      setShowModal(false);
      setShowEditModal(false);
      setPrice(""); // Reset the price in the modal

      setCourseName("");
    //   setStudents("");
    };
  
    // Create a new course
    const handleCreateCourse = async () => {
      if (!courseName || price <= 0 ) {
        alert("Todos los campos son obligatorios y el precio debe ser positivo.");
        return;
      }
  
      try {
        const response = await axios.post(
          "https://register-courses-589432081267.us-central1.run.app",
          {
            contactInstitutionEmail:contactInstitutionEmail,
            courseName,
            // students: Number(students),
            price: Number(price), // Include the price when creating a course

          }
        );
  
        const newCourse = {
          id: response.data.courseId,
          name: courseName,
        //   students: Number(students),
          price: Number(price), // Include price in the new course data

        };
  
        setCourses([...courses, newCourse]);
        handleCloseModal();
      } catch (error) {
        console.error("Error adding course:", error);
        alert("Error al agregar el curso.");
      }
    };
  
    return (
      <>
        <NavbarLoggedInstitution onLogout={onLogout} />
  
        <div className="dashboard-container">
          <main className="dashboard-main">
            {/* Overview Section */}
            <section className="overview">
              <h2>Resumen</h2>
              <p>📚 Cursos registrados: {courses.length}</p>
              {/* <p>👨‍🎓 Estudiantes totales: {courses.reduce((acc, c) => acc + c.students, 0)}</p> */}
            </section>
  
            {/* Course Management */}
            <section className="courses">
              <h2>Mis Cursos</h2>
              <button className="btn add-course-btn" onClick={handleAddCourse}>
                + Agregar Curso
              </button>
              <ul>
                {courses.map((course) => (
                  <li key={course.id}>
                    <span className="course-info">
                    {course.name} - ${new Intl.NumberFormat().format(course.price)}
                    </span>
                    <button className="btn edit-btn" onClick={() => handleEditCourse(course)}>
                    Editar</button>
                    <button className="btn delete-btn"
                      onClick={() => handleDeleteCourse(course.id)}

                    >Eliminar</button>
                  </li>
                ))}
              </ul>
            </section>
  
            {/* Financial Reports */}
            <section className="finance">
              <h2>Finanzas</h2>
              <p>💰 Ingresos estimados: $15,000</p>
              <button className="btn finance-btn">Ver Reportes</button>
            </section>
          </main>
        </div>
  
   {/* Edit Course Modal */}
   {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Curso</h3>
            <label>Nombre del Curso:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
            {/* <label>Número de Estudiantes:</label>
            <input
              type="number"
              value={students}
              onChange={(e) => setStudents(e.target.value)}
            /> */}
            <label>Precio del Curso:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
            <div className="modal-buttons">
              <button className="btn" onClick={handleUpdateCourse}>
                Actualizar
              </button>
              <button className="btn cancel-btn" onClick={handleCloseModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Add Course Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Agregar Nuevo Curso</h3>
              <label>Nombre del Curso:</label>
              <input
                type="text"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
  
              {/* <label>Número de Estudiantes:</label>
              <input
                type="number"
                value={students}
                onChange={(e) => setStudents(e.target.value)}
              /> */}
  <label>Precio del Curso:</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
              <div className="modal-buttons">
                <button className="btn" onClick={handleCreateCourse}>Agregar</button>
                <button className="btn cancel-btn" onClick={handleCloseModal}>Cancelar</button>
              </div>
            </div>
          </div>

          
        )}
      </>
    );
  };
  
  export default DashboardInstitution;
  