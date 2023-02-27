import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../modals/Job.js";
import checkPermission from "../utils/checkPermission.js";

export const createJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        throw new BadRequestError("please Provide all values");
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(200).json({
        job,
    });
};

//<---------- delete jobs --------->
export const deleteJob = async (req, res) => {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
        throw new NotFoundError(`there is no Job with Id: ${jobId}`);
    }
    checkPermission(req.user.userId, job.createdBy);

    await job.remove();

    res.status(200).json({ msg: "Success! Job removed" });
};

//<----------- get all jobs --------->
export const getAlljobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userId });

    res.status(200).json({
        jobs,
        totalJobs: jobs.length,
        numOfPages: 1,
    });
};

//<-------------- update job----------->
export const updateJob = async (req, res) => {
    const { id: jobId } = req.params;
    const { company, position } = req.body;
    if (!company || !position) {
        throw new BadRequestError("please Provide all values");
    }

    const job = await Job.findOne({ _id: jobId });

    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }

    // check permissions

    checkPermission(req.user.userId, job.createdBy);

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        updatedJob,
    });
};

//<---------- show stats--------->

export const showStats = (req, res) => {
    res.send("job stats successfully");
};
