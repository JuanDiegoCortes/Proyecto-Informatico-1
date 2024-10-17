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
            role: role 
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
        res.cookie('token', token);
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