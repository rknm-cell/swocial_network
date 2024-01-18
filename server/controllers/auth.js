import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      displayName,
      user_name,
      email,
      password,
      picturePath,
      friends,
      location,
      description,
    } = req.body;
    const salt = await bcrypt.getSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      displayName,
      user_name,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      description,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ user, token });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
