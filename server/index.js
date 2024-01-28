import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { error } from "console";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

const storage = multer.diskStorage({
  destination : "./public/assets",
  filename : function (req, file, cb){
    return cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage });
//Routes with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

//Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//Mongoose
const PORT = process.env.PORT || 6001;
try {
  mongoose.connect(process.env.MONGO_URL, {});
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  
//   mongoose.connection.collections['users'].drop(function(err) {
//     console.log('collection dropped');
// });

//   try {
//     await User.deleteMany({});
//     await User.insertMany(users);
//   } catch (err) {
//     console.log(err);
//   }
//   try {
//     await Post.deleteMany({});
//     await Post.insertMany(posts);
//   } catch (err) {
//     console.log(err);
//   }

} catch (error) {
  console.error(error.message);
}
