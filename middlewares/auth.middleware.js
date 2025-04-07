import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.headers['Authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });


    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
}
