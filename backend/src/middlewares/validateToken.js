import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies; // Verifica que esté usando req.cookies
    console.log("Request cookies:", req.cookies); // Log de las cookies que recibe el servidor
    if (!token) {
        console.log("No token found."); // Log si no se encuentra el token
        return res.status(401).json({ message: 'No token' });
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if (error) {
            console.error("Token verification error:", error); // Log de errores de verificación
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user; // Almacena el usuario en la solicitud
        next();
    });
};

