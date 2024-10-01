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
        const appointments = await Appointment.find({ userId: req.user.id });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
