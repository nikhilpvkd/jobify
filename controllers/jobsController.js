import mongoose from "mongoose";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import Job from "../modals/Job.js";
import checkPermission from "../utils/checkPermission.js";
import moment from "moment";

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
    const { status, jobType, search, sort } = req.query;

    const queryObject = {
        createdBy: req.user.userId,
    };

    if (status && status !== "all") {
        queryObject.status = status;
    }

    if (jobType && jobType !== "all") {
        queryObject.jobType = jobType;
    }

    if (search) {
        queryObject.position = { $regex: search, $options: "i" };
    }

    let result = Job.find(queryObject);

    if (sort === "latest") {
        result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
        result = result.sort("createdAt");
    }
    if (sort === "a-z") {
        result = result.sort("position");
    }
    if (sort === "z-a") {
        result = result.sort("-position");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const jobs = await result;
    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    // const jobs = await Job.find({ createdBy: req.user.userId });

    res.status(200).json({
        jobs,
        totalJobs: totalJobs,
        numOfPages: numOfPages,
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

export const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        {
            $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) },
        },
        {
            $group: { _id: "$status", count: { $sum: 1 } },
        },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    let defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };
    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        {
            $group: {
                _id: {
                    year: {
                        $year: "$createdAt",
                    },
                    month: {
                        $month: "$createdAt",
                    },
                },
                count: { $sum: 1 },
            },
        },
        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
    ]);

    monthlyApplications = monthlyApplications
        .map((item) => {
            const {
                _id: { year, month },
                count,
            } = item;
            // accepts 0-11
            const date = moment()
                .month(month - 1)
                .year(year)
                .format("MMM Y");
            return { date, count };
        })
        .reverse();

    res.status(200).json({
        stats: defaultStats,
        monthlyApplications,
    });
};
