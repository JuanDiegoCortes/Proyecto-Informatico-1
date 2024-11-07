import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async(req, res) => {
    const { name,lastname,birthdate,phone_number ,email, password, role } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['The email is already in use']);
        
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            lastname,
            birthdate,
            phone_number,
            email,
            password: passwordHash,
            role
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

        const isMatch = await bcrypt.compare(password, userFound.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = await createAccessToken({ id: userFound._id, role: userFound.role });
        res.cookie('token', token, {
            httpOnly: true,      // No accesible desde JS en el frontend
            secure: false,       // Cambiar a true en producción con HTTPS
            sameSite: 'Lax',     // Cambiar a 'None' en producción si es cross-origin con HTTPS
            maxAge: 3600000      // 1 hora de vida para la cookie
        });
        res.json({
            id: userFound._id,
            email: userFound.email,
            role: userFound.role
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
       email: userFound.email,
       role: userFound.role
    })
    res.send('profile');
}

export const checkAuth = (req, res) => {
    if (req.user) {
        return res.json({ isAuthenticated: true, user: req.user});
    } else {
        return res.json({ isAuthenticated: false, user: null });
    }
};