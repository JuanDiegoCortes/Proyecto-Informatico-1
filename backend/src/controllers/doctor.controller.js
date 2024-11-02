import Doctor from '../models/doctor.model.js';
import User from '../models/user.model.js';

export const createDoctor = async (req, res) => {
    try {
        const { userId, specialty, licenseNumber } = req.body;

        // Verifica que el usuario exista
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Verifica que el usuario no tenga ya un perfil de doctor
        const existingDoctor = await Doctor.findOne({ userId });
        if (existingDoctor) return res.status(400).json({ message: 'Doctor profile already exists for this user' });

        // Crea el perfil del doctor
        const newDoctor = new Doctor({
            userId,
            specialty,
            licenseNumber
        });
        await newDoctor.save();

        // Devuelve una respuesta de éxito
        res.status(201).json({ message: 'Doctor profile created successfully', doctor: newDoctor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating doctor profile' });
    }
};
