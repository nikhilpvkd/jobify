import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";

import { connectDB } from "./db/connect.js";

// async error hndler which handles the error without try catch
import "express-async-errors";

//middlewares
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundRoute } from "./middleware/not-found.js";
import authenticateUser from "./middleware/auth/auth.js";

//security middlewares

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// routers
import authRouter from "./router/authRouter.js";
import jobsRouter from "./router/jobRouter.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const app = express();

app.use(express.json());

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// if (process.env.NODE_ENV !== "production") {
//     app.use(morgan("dev"));
// }

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.get("/api/v1", (req, res) => {
    res.json({ msg: "success" });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundRoute);
app.use(errorHandler);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server running in ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};
start();
