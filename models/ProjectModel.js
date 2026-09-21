import mongoose from 'mongoose';
import {
  PROJECT_TYPE,
  PROJECT_STATUS,
  COMPONENT_TYPE,
} from '../utils/constants.js';

const ComponentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    componentType: {
      type: String,
      enum: Object.values(COMPONENT_TYPE),
      default: COMPONENT_TYPE.OTHER,
    },
    languages: {
      type: String,
      default: '',
    },
    deployedAt: {
      type: String,
      default: 'Not deployed yet',
    },
    envVariables: {
      type: String,
      default: '',
    },
    isEnvShared: {
      type: Boolean,
      default: false,
    },
    envNote: {
      type: String,
      default: '',
    },
  },
  { _id: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    liveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    beLiveUrl: {
      type: String,
      default: '',
      trim: true,
    },
    projectType: {
      type: String,
      enum: Object.values(PROJECT_TYPE),
      default: PROJECT_TYPE.BE_FE,
    },
    customProjectType: {
      type: String,
      default: '',
      trim: true,
    },
    projectStatus: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.IN_PROGRESS,
    },

    isPinned: {
      type: Boolean,
      default: false,
    },
    tags: {
      type: [String],
      default: [],
    },
    components: {
      type: [ComponentSchema],
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', ProjectSchema);
