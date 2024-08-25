import express from 'express';
import connectToMongodb from './db/connectToMongo.js';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import reportLoc from "./routes/report.routes.js";
import cors from 'cors';
import path from 'path';


const app = express();
app.use(cors());
app.use(express.json());
const port = 5000;

const __dirname = path.resolve();


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/reportloc", reportLoc);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "Frotnend/dist"))); 


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Frotnend", "dist", "index.html"));
})

app.listen(port, () => {
    connectToMongodb();
    console.log(`Server is running on port ${port}`);
});
