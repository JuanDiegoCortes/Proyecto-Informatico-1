import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Request cookies:", req.cookies);
    
    if (!token) {
        console.log("No token found.");
        return res.status(401).json({ message: 'No token' });
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) {
            console.error("Token verification error:", error);
            return res.status(403).json({ message: 'Invalid token' });
        }
        console.log("User from token:", user);
        req.user = user;
        next();
    });
};


