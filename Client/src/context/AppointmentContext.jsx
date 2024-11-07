    import { createContext, useState, useContext } from 'react';
    import { createAppointmentRequest, getAppointmentsByUserRequest } from '../api/Appointment';

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
            clearErrors
        }}
        >
        {children}
        </AppointmentContext.Provider>
    );
    };