const jwt = require('jsonwebtoken')
const {configDotenv} = require('dotenv')
configDotenv()

const userAuth = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token) {
            return res.json({
                success: false,
                message: 'Not Authorized. Login Again'
            });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (decodedToken.id) {
            req.userId = decodedToken.id; 

        } else {
            return res.json({
                success: false,
                message: 'Not Authorized. Login Again'
            });
        }

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};

module.exports = userAuth