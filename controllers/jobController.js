// import { nanoid } from 'nanoid'
import Job from '../models/jobModel.js'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/CustomErrors.js'

export const getAllJobs = async (req, res) => {
  console.log(req.user)
  const jobs = await Job.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const job = await Job.findById(req.params.id)
  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({ updatedJob })
}

export const deleteJob = async (req, res) => {
  const removedJob = await Job.findByIdAndDelete(req.params.id)
  res.status(StatusCodes.OK).json({ removedJob })
}


