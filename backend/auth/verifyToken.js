import jwt from "jsonwebtoken";
import Staff from "../modelsNew/StaffSchema.js";
import Admin from "../modelsNew/AdminSchema.js";

export const authenticate = async (req, res, next) => {
  // Get token from headers
  const authToken = req.headers.authorization;

  // Check token existence
  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next(); // Move to the next middleware or route handler
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;

  try {
    // Check if user exists in Staff or Admin
    const staffUser = await Staff.findById(userId);
    const adminUser = await Admin.findById(userId);

    let user = null;

    if (staffUser) {
      user = staffUser;
    } else if (adminUser) {
      user = adminUser;
    }

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if user role is authorized
    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "You're not authorized" });
    }

    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
