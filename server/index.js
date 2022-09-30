import dotenv from 'dotenv';
import express from 'express';
import mongoose from "mongoose";
import UserRoutes from "./routes/userRoutes.js";
import AddonRoutes from "./routes/addonRoutes.js";

// load .env file contents into process.env
dotenv.config();

// create express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/user', UserRoutes);
app.use('/api/addons', AddonRoutes);

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to mongodb");
            console.log(`running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
