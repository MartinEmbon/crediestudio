import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';  
import { Provider } from "react-redux";
import { store } from "./redux/store";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import CourseSummary from "./pages/CourseSummary";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserDashboard from "./pages/UserDashboard";
import Contacto from "./pages/Contacto";
import Home from "./pages/Home";
import Instituciones from "./pages/Instituciones";
import ParaAlunos from "./pages/ParaAlunos";
import UserProfile from "./pages/UserProfile";
import DashboardInstitution from "./pages/DashboardInstitution";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContent = () => {
  // Get user info from Redux store
  const userInfo = useSelector((state) => state.user.userInfo);

  // Function to determine which dashboard to show
  const getDashboard = () => {
    if (!userInfo) return <Navigate to="/login" />; // Redirect if not logged in
    if (userInfo.role === "student") return <UserDashboard />;
    if (userInfo.role === "institution") return <DashboardInstitution />;
    return <UserDashboard />; // Default dashboard
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/instituciones" element={<Instituciones />} />
      <Route path="/para-alumnos" element={<ParaAlunos />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
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
        path="/dashboard"
        element={
          <ProtectedRoute>
            {getDashboard()}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId="867228903962-3rs922ieqcl8ttpaa8glcl0r0so4d6ps.apps.googleusercontent.com">
        <Router>
          <AppContent />
        </Router>
      </GoogleOAuthProvider>
    </Provider>
  );
};

export default App;
