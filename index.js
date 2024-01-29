import express, { json, response } from "express";
import cors from "cors";
import connectDb from "./config/dbConnection.js";
import adminRoute from "./routes/adminRoute.js";
import userRoute from "./routes/userRoute.js";
// import produtRoute from "./routes/productRoute.js";
import dotenv from "dotenv";


const app = express();
connectDb();
dotenv.config();
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'));


app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
// app.use("/api/product", produtRoute);



app.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on PORT ${process.env.PORT || 3000}`);
})