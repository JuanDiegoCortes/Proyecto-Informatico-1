import { AuthProvider } from '../context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import AdminHomePage from './HomePageAdmin';
import AdminConsultPage from './ConsultPageAdmin';
import AdminUsersPage  from './UsersAdmin';
import { AppointmentProvider } from '../context/AppointmentContext';

function AdminLayout() {
    return (
        <AuthProvider>
            <AppointmentProvider>
                <Routes>
                    {/* Ruta de inicio para `/admin` */}
                    <Route index element={<AdminHomePage />} />
                    {/* Subruta para `/admin/consults` */}
                    <Route path="consults" element={<AdminConsultPage />} />
                     {/* Subruta para `/admin/users` */}
                     <Route path="users" element={<AdminUsersPage  />} />
                </Routes>
            </AppointmentProvider>
        </AuthProvider>
    );
}

export default AdminLayout;
