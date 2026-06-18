import supabase from "../config/supabase.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }
    console.log("AUTH HEADER:", authHeader);
    const token = authHeader.split(" ")[1];
    console.log("TOKEN:", token);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    console.log("USER:", user);
    console.log("ERROR:", error);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("FULL ERROR:");
    console.log(error);

    console.log("ERROR MESSAGE:");
    console.log(error.message);

    console.log("ERROR DETAILS:");
    console.log(error.details);

    console.log("ERROR HINT:");
    console.log(error.hint);

    console.log("ERROR CODE:");
    console.log(error.code);
    res.status(500).json({
      success: false,
      message: "Authentication failed",
    });
  }
};

export default authMiddleware;
