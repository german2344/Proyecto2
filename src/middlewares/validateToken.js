import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = (req, res, next) => {
    // Extraer las cookies del encabezado
    const cookies = req.headers.cookie;
    if (!cookies) return res.status(401).json({ message: "No token, unauthorized" });

    // Extraer el token de las cookies
    const tokenMatch = cookies.match(/token=([^;]*)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) return res.status(401).json({ message: "No token, unauthorized" });

    // Verificar el token
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        req.user = user;
        next();
    });
};
