import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import requireAdminAuth from './middleware/requireAdminAuth.js';
import userRouter from "./routes/userRoute.js"
import taskRouter from "./routes/taskRoute.js"
import userModel from './models/userModel.js';
import forgotPasswordRouter from "./routes/forgotPassword.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 8000
const isAdmin = (req, res, next) => {
    if (req.user.role === 'admin') {
        next(); 
    } else {
        res.status(403).json({ message: 'Unauthorized' }); 
    }
};
app.get('/adminEndpoint', requireAdminAuth, (req, res) => {
  res.json({ message: 'Admin access granted' });
});

app.get('/admin/getUsers', requireAdminAuth, async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete('/admin/deleteUser/:id', requireAdminAuth, async (req, res) => {
    const { id } = req.params;
    try {
      const user = await userModel.findByIdAndRemove(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

mongoose.set('strictQuery', true);

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Connected");
    }
});

app.use("/api/user", userRouter)
app.use("/api/task", taskRouter)
app.use("/api/forgotPassword", forgotPasswordRouter)

app.listen(port, () => console.log(`Listening on localhost:${port}`))