import jwt from 'jsonwebtoken';



function authMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status('Access denied. No token found');
    try {
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;

    }
    catch(err) {
        console.log(err);
        return res.status(403).json("something went wrong");
    }
}