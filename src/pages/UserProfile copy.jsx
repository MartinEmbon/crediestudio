import React from "react";
import "../styles/UserProfile.css";
import NavbarLoggedIn from "../NavbarLoggedUser";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";


const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    phone: "+54 11 1234-5678",
    address: "Av. Corrientes 1234, Buenos Aires, Argentina",
    profilePic: "/assets/profile-pic.jpg", // Mock profile picture
    loans: [
      { id: 1, amount: 5000, status: "Approved", dueDate: "2025-06-30" },
      { id: 2, amount: 3000, status: "Pending", dueDate: "2025-08-15" },
    ],
  };

  const onLogout = () => {
    dispatch(setUser (null)); // Clear user info from Redux
    navigate("/signin"); // Redirect to login page
  };


  return (
    <>
    <NavbarLoggedIn onLogout={onLogout}/>
    <div className="profile-container">
      <h1>Mi Perfil</h1>
      <div className="profile-card">
        <img src={user.profilePic} alt="Profile" className="profile-pic" />
        <h2>{user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Dirección:</strong> {user.address}</p>
        <button className="edit-btn">Editar Perfil</button>
      </div>

      <h2>Mis Préstamos</h2>
      <div className="loans-container">
        {user.loans.map((loan) => (
          <div key={loan.id} className="loan-card">
            <p><strong>Monto:</strong> ${loan.amount}</p>
            <p><strong>Estado:</strong> {loan.status}</p>
            <p><strong>Fecha de Vencimiento:</strong> {loan.dueDate}</p>
            
          </div>
        ))}
      
      </div>
      <button className="loan-form button back-button" onClick={() => navigate(-1)}>
          Volver
        </button>
    </div>
    </>

  );
};

export default UserProfile;
