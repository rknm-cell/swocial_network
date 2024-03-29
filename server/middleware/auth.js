import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization; // Changed from req.head("Authorization")
    if (!token) {
      return res.status(401).json({ error: "You need to Login" });
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
