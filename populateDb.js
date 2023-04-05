import { readFile } from "fs/promises";

import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import Job from "./modals/Job.js";

dotenv.config();

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        const jsonData = JSON.parse(
            await readFile("./mock-data.json", new URL(import.meta.url))
        );
        await Job.create(jsonData);
        console.log("sucessss!!!!");
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
};

start();
