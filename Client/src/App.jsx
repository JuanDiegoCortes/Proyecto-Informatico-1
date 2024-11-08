import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConsultPage from './pages/ConsultPage';
import DoctorPage from './pages/DoctorPage'; // Importar la página del doctor
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { DoctorProvider } from './context/DoctorContext'; // Importar el contexto del doctor

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Envuelve ConsultPage con AppointmentProvider */}
          <Route
            path="/consult"
            element={
              <AppointmentProvider>
                <ConsultPage />
              </AppointmentProvider>
            }
          />
          {/* Nueva ruta para DoctorPage envuelta con DoctorProvider */}
          <Route
            path="/doctor"
            element={
              <DoctorProvider>
                <DoctorPage />
              </DoctorProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;