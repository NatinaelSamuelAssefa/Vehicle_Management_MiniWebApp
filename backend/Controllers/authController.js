import Staff from "../modelsNew/StaffSchema.js";
import Admin from "../modelsNew/AdminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email }, // Add more info if needed
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

const findUserByEmail = async (email) => {
  const staff = await Staff.findOne({ email });
  const admin = await Admin.findOne({ email });
  return staff || admin; // Return the user if found
};

export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "Email, password, name, and role are required" });
  }

  try {
    const validRoles = ["StaffUser", "AdminUser"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      name,
      email,
      password: hashedPassword,
      photo,
      gender,
      role,
    };

    const user = role === "StaffUser" ? new Staff(userData) : new Admin(userData);
    await user.save();

    res.status(200).json({ success: true, message: "User successfully created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error, Try again" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ status: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);
    const { password: userPassword, role, ...rest } = user._doc;

    res.status(200).json({
      status: true,
      message: "Successfully logged in",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to login" });
  }
};
