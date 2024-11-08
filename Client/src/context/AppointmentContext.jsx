import { createContext, useState, useContext } from 'react';
import { createAppointmentRequest, getAppointmentsByUserRequest, getDiagnosticByAppointmentRequest } from '../api/Appointment';

export const AppointmentContext = createContext();

export const useAppointment = () => {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error('useAppointment must be used within an AppointmentProvider');
    }
    return context;
};

export const AppointmentProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    // Función para obtener el diagnóstico de una cita
    const getDiagnosticByAppointment = async (appointmentId) => {
        try {
            const response = await getDiagnosticByAppointmentRequest(appointmentId); // Usamos el request de API
            console.log("Respuesta del backend para el diagnóstico:", response.data);
            return response.data;  // Devuelve los datos del diagnóstico
        } catch (error) {
            console.error("Error al obtener el diagnóstico:", error);
            throw error;
        }
    };

    const createAppointment = async (appointmentData) => {
        try {
            setLoading(true);
            const res = await createAppointmentRequest(appointmentData);
            setAppointments(prevAppointments => [res.data, ...prevAppointments]);
            return res.data;
        } catch (error) {
            console.error("Error creating appointment:", error);
            if (error.response?.data?.message) {
                setErrors(error.response.data.message);
            } else {
                setErrors("Error al crear la cita");
            }
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getAllAppointmentsByUser = async () => {
        try {
            setLoading(true);
            const res = await getAppointmentsByUserRequest();
            setAppointments(res.data);
            setErrors(null);
        } catch (error) {
            console.error("Error fetching appointments:", error);
            if (error.response?.data?.message) {
                setErrors(error.response.data.message);
            } else {
                setErrors("Error al obtener las citas");
            }
        } finally {
            setLoading(false);
        }
    };

    const clearErrors = () => {
        setErrors(null);
    };

    return (
        <AppointmentContext.Provider
            value={{
                appointments,
                errors,
                loading,
                createAppointment,
                getAllAppointmentsByUser,
                getDiagnosticByAppointment, // Exponer la función para obtener diagnóstico
                clearErrors
            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
};
