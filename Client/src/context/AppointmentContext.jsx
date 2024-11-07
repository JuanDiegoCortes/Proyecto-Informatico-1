    import { createContext, useState, useContext } from 'react';
    import { createAppointmentRequest, getAppointmentsByUserRequest, assignDoctorToAppointmentRequest } from '../api/Appointment';

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
            setAppointments(prevAppointments => [res.data, ...prevAppointments]);  // Agrega la cita al principio
            console.log("Cita creada:", res.data);  // Verifica si se crea correctamente
            await getAllAppointmentsByUser();  // Vuelve a cargar las citas después de la creación
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
            setAppointments(res.data);  // Actualiza el estado con las citas obtenidas
            console.log("Citas obtenidas:", res.data);
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

    const assignDoctorToAppointment = async (appointmentId, doctorId) => {
        try {
            setLoading(true);
            await assignDoctorToAppointmentRequest(appointmentId, doctorId);
            setAppointments(prevAppointments => 
                prevAppointments.map(app =>
                    app._id === appointmentId ? { ...app, doctorId } : app
                )
            );
        } catch (error) {
            console.error("Error assigning doctor:", error);
            setErrors(error.response?.data?.message || "Error al asignar el doctor");
            throw error;
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
            assignDoctorToAppointment,
            clearErrors
        }}
        >
        {children}
        </AppointmentContext.Provider>
    );
    };