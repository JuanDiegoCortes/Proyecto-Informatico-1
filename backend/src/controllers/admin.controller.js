import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Appointment from "../models/appointment.model.js";

export const listAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'User' }).select('-password'); // Filtrar por rol 'user' y no incluir la contraseña
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // No incluir la contraseña
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
        ).select('-password'); // No incluir la contraseña
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id).select('-password'); // No incluir la contraseña
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const completeDoctorProfile = async (req, res) => {
    const { specialty, licenseNumber } = req.body; // No necesitamos userId aquí

    try {
        const userId = req.params.id; // Obtener el userId de la URL

        // Verificar si ya existe un perfil de doctor para este usuario
        const doctorFound = await Doctor.findOne({ userId });
        if (doctorFound) return res.status(400).json({ message: 'Doctor profile already exists' });

        // Crear el perfil del doctor
        const newDoctorProfile = new Doctor({
            userId, // Guardar el userId del usuario
            specialty,
            licenseNumber,
        });

        const doctorSaved = await newDoctorProfile.save();

        // Enviar los datos del perfil de doctor creado
        res.status(201).json({
            id: doctorSaved._id,
            userId: doctorSaved.userId,
            specialty: doctorSaved.specialty,
            licenseNumber: doctorSaved.licenseNumber,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignDoctorToAppointment = async (req, res) => {
    const { appointmentId, doctorId } = req.body;

    try {
        // Verificar si el appointment existe y está en estado pendiente
        const appointmentFound = await Appointment.findById(appointmentId);
        if (!appointmentFound || appointmentFound.status !== 'pending') {
            return res.status(400).json({ message: 'Appointment not found or already processed' });
        }

        // Verificar si el doctor existe
        const doctorFound = await Doctor.findById(doctorId);
        if (!doctorFound) return res.status(404).json({ message: 'Doctor not found' });

        // Verificar que el doctor no tenga otra cita a la misma hora
        const conflictingAppointment = await Appointment.findOne({
            doctorId: doctorId,
            date: appointmentFound.date,
            status: 'approved',
        });
        if (conflictingAppointment) {
            return res.status(400).json({ message: 'Doctor is not available at this time' });
        }

        // Asignar el doctor a la cita y cambiar el estado a approved
        appointmentFound.doctorId = doctorId;
        appointmentFound.status = 'approved';
        const updatedAppointment = await appointmentFound.save();

        // Enviar la respuesta con la cita actualizada y los detalles del doctor
        res.status(200).json({
            id: updatedAppointment._id,
            userId: updatedAppointment.userId,
            doctorId: updatedAppointment.doctorId,
            date: updatedAppointment.date,
            description: updatedAppointment.description,
            status: updatedAppointment.status,
            doctor: {
                id: doctorFound._id,
                specialty: doctorFound.specialty,
                licenseNumber: doctorFound.licenseNumber,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

