import Appointment from '../models/appointment.model.js';
import Diagnostic from '../models/diagnostic.model.js';

// Método para crear una cita
export const createAppointment = async (req, res) => {
    try {
        const { date, description } = req.body;
        const userId = req.user.id;

        const newAppointment = new Appointment({
            userId,
            date,
            description,
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para obtener todas las citas del usuario actual
export const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.user.id });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Método para obtener un diagnóstico basado en el ID de la cita
export const getDiagnosticByAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        // Buscar el diagnóstico asociado a la cita
        const diagnostic = await Diagnostic.findOne({ appointmentId }).populate('doctorId', 'name');
        if (!diagnostic) {
            return res.status(404).json({ message: "Diagnóstico no encontrado para esta cita" });
        }

        res.status(200).json(diagnostic);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
