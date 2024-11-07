import Appointment from '../models/appointment.model.js'

export const createAppointment = async (req, res) => {
    try {
        const { date, description } = req.body;
        const userId = req.user.id;

        const newAppointment = new Appointment({
            userId,
            date,
            description
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAppointments = async (req, res) => {
    try {
        // Si el usuario es un administrador, se muestran todas las citas
        if (req.user.role === 'Administrator') {
            const appointments = await Appointment.find(); // Obtener todas las citas
            console.log (appointments)
            return res.status(200).json(appointments);
         
        }
        
        // Si el usuario no es administrador, solo se muestran las citas del usuario actual
        const appointments = await Appointment.find({ userId: req.user.id });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignDoctorToAppointment = async (req, res) => {
    const { appointmentId } = req.params;
    const { doctorId } = req.body;

    try {
        // Buscar y actualizar la cita con el doctor asignado
        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { doctorId },
            { new: true }
        );

        if (!appointment) return res.status(404).json({ message: "Cita no encontrada" });

        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

