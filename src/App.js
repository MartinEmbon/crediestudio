import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider

import { Provider } from "react-redux";
import { store } from "./redux/store";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import LoanRequest from "./pages/LoanRequest";
import LoanConfirmation from "./pages/LoanConfirmation";
import CourseSummary from './pages/CourseSummary'; // Caminho pode variar dependendo da estrutura do seu projeto
import Navbar from './Navbar'; // Import the Navbar component
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from "./components/ProtectedRoute"; // Importamos el componente de rutas protegidas
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";
import Instituciones from "./pages/Instituciones";
import ParaAlunos from "./pages/ParaAlunos";
import UserProfile from "./pages/UserProfile";
import DashboardInstitution from "./pages/DashboardInstitution";

import ApplicationsPage from "./pages/ApplicationsPage";
import AdminCourseForm from "./pages/AdminLoanForm";
import SignInAdmin from "./pages/SignInAdmin";
import AdminApplications from "./pages/AdminApplications";
import ResetPassword from "./pages/ResetPassword";
import MyProducts from "./pages/MyProducts";
import FaqPreguntas from "./pages/FaqPreguntas";




const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="867228903962-3rs922ieqcl8ttpaa8glcl0r0so4d6ps.apps.googleusercontent.com">
        <BrowserRouter>
        
          <Routes>
            {/* Rutas públicas */}
            {/* <Route path="/" element={<LandingPage />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/instituciones" element={<Instituciones />} />
            <Route path="/para-alumnos" element={<ParaAlunos />} />
            <Route path="/admin-login" element={<SignInAdmin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

            {/* <Route path="/dashboard" element={<UserDashboard />} /> */}


            {/* Rutas privadas protegidas */}
            <Route
              path="/mis-productos/:id"
              element={
                <ProtectedRoute requiredRole="student">
                  <CourseSummary />
                </ProtectedRoute>
              }
            />
             <Route
              path="/preguntas-frecuentes"
              element={
                <ProtectedRoute requiredRole="student">
                  <FaqPreguntas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mis-productos"
              element={
                <ProtectedRoute requiredRole="student">
                  <MyProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute requiredRole="institution">
                  <ApplicationsPage />
                </ProtectedRoute>
              }
            />
           <Route
              path="/perfil-usuario"
              element={
                <ProtectedRoute requiredRole="student">
                  <UserProfile />
                </ProtectedRoute>
              }
            />

<Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminCourseForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-applications"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/solicitud-prestamo"
              element={
                <ProtectedRoute requiredRole="student">
                  <LoanRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmacion-prestamo"
              element={
                <ProtectedRoute requiredRole="student">
                  <LoanConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="student">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard-institution"
              element={
                <ProtectedRoute requiredRole="institution">
                  <DashboardInstitution  />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};
export default App;


