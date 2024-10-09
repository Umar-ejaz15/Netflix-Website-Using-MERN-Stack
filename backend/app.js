import express from "express";
import dotenv from "dotenv";
import MongoConnect from "./utils/mongoose-connection.js";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/UserRoutes.js";
import cors from "cors";

dotenv.config({ path: ".env" });

const corsOptions = {
    origin: "https://netflixinfotv.vercel.app/",
    credentials: true,
};

const app = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

MongoConnect();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/users", UserRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
