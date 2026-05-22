import { signUpUser } from "../services/authService.js";

export const register = async(req, res) => {
    try {
        const user = await signUpUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};