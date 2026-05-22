import supabase from "../config/supabase.js";

const roleMiddleware = (...allowedRoles) => {
    return async(req, res, next) => {
        try {
            const { data, error } = await supabase
                .from("profiles")
                .select("role")
                .eq("id", req.user.id)
                .single();

            if (error) {
                throw new Error(error.message);
            }

            if (!allowedRoles.includes(data.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied",
                });
            }

            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };
};

export default roleMiddleware;