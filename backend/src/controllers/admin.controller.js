import User from "../models/user.model.js";
import Appointment from "../models/appointment.model.js";

export const listAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name, lastname, birthdate, phone_number, email, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, lastname, birthdate, phone_number, email, role },
            { new: true, runValidators: true }
        ).select('-password');
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id).select('-password');
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignDoctorToAppointment = async (req, res) => {
    try {
        const { doctorId } = req.body;
        const appointmentId = req.params.id;

        const appointmentFound = await Appointment.findById(appointmentId);
        if (!appointmentFound || appointmentFound.status !== 'pending') {
            return res.status(400).json({ message: 'Appointment not found or already processed' });
        }

        const doctorFound = await User.findById(doctorId);
        if (!doctorFound || doctorFound.role !== 'doctor') return res.status(404).json({ message: 'Doctor not found' });

        const conflictingAppointment = await Appointment.findOne({
            doctorId: doctorId,
            date: appointmentFound.date,
            status: 'approved',
        });
        if (conflictingAppointment) {
            return res.status(400).json({ message: 'Doctor is not available at this time' });
        }

        appointmentFound.doctorId = doctorId;
        appointmentFound.status = 'approved';
        const updatedAppointment = await appointmentFound.save();

        res.status(200).json({
            message: 'Doctor assigned to appointment successfully',
            appointment: updatedAppointment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};