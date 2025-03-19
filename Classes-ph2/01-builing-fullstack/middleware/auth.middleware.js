import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
    console.log(req.body);

    try {
        let token = req.cookies?.token;

        console.log("Token found: ", token ? "YES" : "No");
        if (!token) {
            console.log('No Token');
            return res.status(400).json({
                success: false,
                msg: "Authentication failed"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('Decoded data ', decoded);
        req.user = decoded

    } catch (error) {
        console.log('Auth Middleware failer');

        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        })
    }

    next()
}