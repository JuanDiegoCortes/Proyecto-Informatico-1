import User from '../models/user.model.js';
import bycrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async(req, res) => {
    const { name,lastname,birthdate,phone_number ,email, password, role } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['The email is already in use']);
        
        const passwordHash = await bycrypt.hash(password, 10);
        const newUser = new User({
            name,
            lastname,
            birthdate,
            phone_number,
            email,
            password: passwordHash,
            role: role || 'user' // Rol por defecto si no se define
        });

        const userSaved = await newUser.save();
        res.json({
            id: userSaved._id,
            name: userSaved.name,
            lastname: userSaved.lastname,
            birthdate: userSaved.birthdate,
            phone_number: userSaved.phone_number,
            email: userSaved.email,
            role: userSaved.role
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const login = async(req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({ email})

        if (!userFound) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bycrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token', token, {
            httpOnly: true,      // No accesible desde JS en el frontend
            secure: false,       // Cambiar a true en producción con HTTPS
            sameSite: 'Lax',     // Cambiar a 'None' en producción si es cross-origin con HTTPS
            maxAge: 3600000      // 1 hora de vida para la cookie
        });
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    });
    return res.sendStatus(200);
}

export const profile = async(req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: 'User not found' });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
    res.send('profile');
}

export const registerDoctor = async (req, res) => {
    const { name, lastname, specialty, licenseNumber, email, password } = req.body;

    try {
        const doctorFound = await Doctor.findOne({ email });
        if (doctorFound) return res.status(400).json(['The email is already in use']);

        const passwordHash = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            name,
            lastname,
            specialty,
            licenseNumber,
            email,
            password: passwordHash,
            role: 'doctor' // Esto puede variar dependiendo de cómo defines los roles
        });

        const doctorSaved = await newDoctor.save();
        res.json({
            id: doctorSaved._id,
            name: doctorSaved.name,
            specialty: doctorSaved.specialty,
            email: doctorSaved.email,
            role: doctorSaved.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};