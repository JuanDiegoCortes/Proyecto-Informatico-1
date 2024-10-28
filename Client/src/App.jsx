import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ConsultPage from'./pages/ConsultPage'
import { AuthProvider } from './context/AuthContext'

function App() {
  
  return (
    <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/consult" element={<ConsultPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
