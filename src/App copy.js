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


const App = () => {

    // Get user info from Redux
    const userInfo = useSelector((state) => state.user.userInfo);

    // Function to determine which dashboard to show
    const getDashboard = () => {
      if (!userInfo) return <Navigate to="/login" />; // Redirect if not logged in
      if (userInfo.role === "student") return <UserDashboard />;
      if (userInfo.role === "institution") return <DashboardInstitution />;
      return <UserDashboard />; // Default to user dashboard
    };

    
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

            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/admin-dashboard" element={<AdminDashboard />} /> */}

            {/* <Route path="/dashboard" element={<UserDashboard />} /> */}


            {/* Rutas privadas protegidas */}
            <Route
              path="/mis-prestamos"
              element={
                <ProtectedRoute>
                  <CourseSummary />
                </ProtectedRoute>
              }
            />
           
           <Route
              path="/perfil-usuario"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/solicitud-prestamo"
              element={
                <ProtectedRoute>
                  <LoanRequest />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirmacion-prestamo"
              element={
                <ProtectedRoute>
                  <LoanConfirmation />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {/* <Dashboard /> */}
                  {getDashboard()}
                </ProtectedRoute>
              }
            />
            {/* <Route
              path="/dashboard-institution"
              element={
                <ProtectedRoute>
                  <DashboardInstitution />
                </ProtectedRoute>
              }
            /> */}
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
};
export default App;


