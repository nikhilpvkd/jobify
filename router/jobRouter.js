import express from "express";
import {
    createJob,
    deleteJob,
    getAlljobs,
    showStats,
    updateJob,
} from "../controllers/jobsController.js";
const router = express.Router();

router.route("/").post(createJob).get(getAlljobs);
router.route("/stats").get(showStats);
router.route("/:id").patch(updateJob).delete(deleteJob);

export default router;
