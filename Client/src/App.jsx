import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContext'
import RegisterDoctorPage from './pages/RegisterDoctorPage'
import DoctorPage from './pages/DoctorPage'

function App() {
  
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-doctor" element={<RegisterDoctorPage />} />
            <Route path="/doctor" element={<DoctorPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
