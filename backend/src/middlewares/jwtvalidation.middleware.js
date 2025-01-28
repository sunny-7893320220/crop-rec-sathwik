import jwt from 'jsonwebtoken';




const jwtValidation =  (req, res, next) => {
    const auth = req.headers['authorization'];
    console.log(auth);
    if (!auth) {
        return res.status(401).json({ message: 'Access denied, No token provided' });   
    }

    if (!auth.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied, Invalid token format' });
    }

    const token = auth.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied, No token provided in token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        //heare we are used decoded value to get the user id and we are storing it in the req.user  so that we can use it in the next middleware
        req.user = decoded;
        next();
    } catch (err) {
       return res.status(400).json({ message: 'Invalid token' });
    }
};

export { jwtValidation };