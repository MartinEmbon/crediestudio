import React from "react";
import { useSelector } from "react-redux";
import CourseSummary from "./CourseSummary"; // Import the CourseSummary component

const Dashboard = () => {
  const user = useSelector((state) => state.user.userInfo);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Bienvenido, {user?.name || "Usuario"}</h1>
      </header>
      <main style={styles.main}>
        <h2>¡Tu perfil de usuario está listo!</h2>
        <p>Este es tu panel donde puedes gestionar tu crédito educativo.</p>
        
        {/* Add CourseSummary component here */}
        <CourseSummary />  
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
  },
  header: {
    marginBottom: "50px",
  },
  main: {
    marginTop: "30px",
  },
};

export default Dashboard;
