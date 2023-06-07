const jwt = require("jsonwebtoken");
require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET;
const jwtSecret_super = process.env.JWT_SECRET_SUPER;

module.exports.verifytoken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "No token found" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.UserId;


        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Invalid token" });
    }
};


module.exports.verifySuperUserToken = async (req, res, next) => {
    const token = req.header(jwtSecret_super);

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret_super);
        console.log(decoded.role)


        req.user = decoded;

        next();
    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};
