
import jwt from 'jsonwebtoken'



async function token_verification(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        // Verify the token asynchronously
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // If verification is successful, send the response
        req.user = decoded;
        next();
    } catch (err) {
        // Handle token verification error
        console.error('JWT Verification Error:', err.message);
        res.status(401).json({ error: 'Unauthorized' });
    }


}

export {token_verification};