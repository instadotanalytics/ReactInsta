import FullTimeJob from "../models/FullTimeJob.js";

export const createFullTimeJob = async (req, res) => {
  try {
    const job = new FullTimeJob(req.body);
    await job.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
// ✅ GET - Get All Applications
export const getAllFullTimeJobs = async (req, res) => {
  try {
    const jobs = await FullTimeJob.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};