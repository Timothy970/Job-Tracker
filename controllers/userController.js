import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';
import day from 'dayjs';

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const usersCount = await User.countDocuments();
  const jobsCount = await Job.countDocuments();

  // Status breakdown aggregation
  let statusStats = await Job.aggregate([
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
  ]);
  statusStats = statusStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStatusStats = {
    pending: statusStats.pending || 0,
    interview: statusStats.interview || 0,
    accepted: statusStats.accepted || 0,
    declined: statusStats.declined || 0,
  };

  // Job type breakdown aggregation
  let typeStats = await Job.aggregate([
    { $group: { _id: '$jobType', count: { $sum: 1 } } },
  ]);
  typeStats = typeStats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  // Monthly applications trend platform-wide
  let monthlyApplications = await Job.aggregate([
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  // Top companies aggregation
  const topCompanies = await Job.aggregate([
    { $match: { company: { $exists: true, $ne: '' } } },
    { $group: { _id: '$company', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // Top locations aggregation
  const topLocations = await Job.aggregate([
    { $match: { jobLocation: { $exists: true, $ne: '' } } },
    { $group: { _id: '$jobLocation', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  // Recent users
  const recentUsers = await User.find({})
    .select('name lastName email location role avatar createdAt')
    .sort({ _id: -1 })
    .limit(5);

  // Recent applications platform-wide
  const recentJobs = await Job.find({})
    .select('position company jobLocation jobType jobStatus createdAt createdBy')
    .populate('createdBy', 'name lastName email')
    .sort({ createdAt: -1 })
    .limit(6);

  res.status(StatusCodes.OK).json({
    users: usersCount,
    jobs: jobsCount,
    statusStats: defaultStatusStats,
    typeStats,
    monthlyApplications,
    topCompanies: topCompanies.map((c) => ({ name: c._id, count: c.count })),
    topLocations: topLocations.map((l) => ({ name: l._id, count: l.count })),
    recentUsers,
    recentJobs,
  });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;
  delete newUser.role;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: 'update user' });
};
