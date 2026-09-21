import Project from '../models/ProjectModel.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';


// Helper to build MongoDB query from request params
const buildProjectQuery = (userId, query) => {
  const { search, projectType, projectStatus, componentType, deploymentStatus } = query;

  const queryObject = {
    createdBy: new mongoose.Types.ObjectId(userId),
  };

  if (search && search.trim() !== '') {
    const s = search.trim();
    queryObject.$or = [
      { title: { $regex: s, $options: 'i' } },
      { description: { $regex: s, $options: 'i' } },
      { githubUrl: { $regex: s, $options: 'i' } },
      { liveUrl: { $regex: s, $options: 'i' } },
      { beLiveUrl: { $regex: s, $options: 'i' } },
      { customProjectType: { $regex: s, $options: 'i' } },
      { 'components.name': { $regex: s, $options: 'i' } },
      { 'components.languages': { $regex: s, $options: 'i' } },
      { 'components.deployedAt': { $regex: s, $options: 'i' } },
      { tags: { $regex: s, $options: 'i' } },
    ];
  }

  if (projectType && projectType !== 'all') {
    queryObject.projectType = projectType;
  }

  if (projectStatus && projectStatus !== 'all') {
    queryObject.projectStatus = projectStatus;
  }

  if (componentType && componentType !== 'all') {
    queryObject['components.componentType'] = componentType;
  }

  if (deploymentStatus === 'deployed') {
    queryObject['components.deployedAt'] = {
      $exists: true,
      $nin: ['', 'Not deployed yet', 'not deployed yet', 'null', null],
    };
  } else if (deploymentStatus === 'not-deployed') {
    queryObject['components.deployedAt'] = {
      $in: ['', 'Not deployed yet', 'not deployed yet', 'null', null],
    };
  }

  return queryObject;
};

export const getAllProjects = async (req, res) => {
  const queryObject = buildProjectQuery(req.user.userId, req.query);

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'title',
    'z-a': '-title',
    'recently-updated': '-updatedAt',
  };

  const sortKey = sortOptions[req.query.sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const projects = await Project.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const totalProjects = await Project.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalProjects / limit);

  res.status(StatusCodes.OK).json({
    totalProjects,
    numOfPages,
    currentPage: page,
    projects,
  });
};

export const createProject = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const project = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ project });
};

export const getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.status(StatusCodes.OK).json({ project });
};

export const updateProject = async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'project updated successfully', project: updatedProject });
};

export const deleteProject = async (req, res) => {
  const removedProject = await Project.findByIdAndDelete(req.params.id);
  res
    .status(StatusCodes.OK)
    .json({ msg: 'project deleted', project: removedProject });
};

// Export endpoint supporting JSON, CSV, and Markdown
export const exportProjects = async (req, res) => {
  const queryObject = buildProjectQuery(req.user.userId, req.query);
  const { format = 'json' } = req.query;

  const projects = await Project.find(queryObject).sort('-createdAt');

  if (format === 'json') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="projects-export-${day().format('YYYY-MM-DD')}.json"`
    );
    return res.status(StatusCodes.OK).json(projects);
  }

  if (format === 'csv') {
    // Generate CSV
    const headers = [
      'Title',
      'Description',
      'GitHub URL',
      'Project Type',
      'Status',
      'Component Name',
      'Component Type',
      'Languages / Stack',
      'Deployed At',
      'Created Date',
    ];

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replaceAll('"', '""');
      return `"${str}"`;
    };

    const rows = [headers.join(',')];

    for (const p of projects) {
      if (!p.components || p.components.length === 0) {
        rows.push(
          [
            escapeCsv(p.title),
            escapeCsv(p.description),
            escapeCsv(p.githubUrl),
            escapeCsv(p.projectType),
            escapeCsv(p.projectStatus),
            escapeCsv(''),
            escapeCsv(''),
            escapeCsv(''),
            escapeCsv(''),
            escapeCsv(day(p.createdAt).format('YYYY-MM-DD')),
          ].join(',')
        );
      } else {
        for (const c of p.components) {
          rows.push(
            [
              escapeCsv(p.title),
              escapeCsv(p.description),
              escapeCsv(p.githubUrl),
              escapeCsv(p.projectType),
              escapeCsv(p.projectStatus),
              escapeCsv(c.name),
              escapeCsv(c.componentType),
              escapeCsv(c.languages),
              escapeCsv(c.deployedAt),
              escapeCsv(day(p.createdAt).format('YYYY-MM-DD')),
            ].join(',')
          );
        }
      }
    }

    const csvData = rows.join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="projects-${day().format('YYYY-MM-DD')}.csv"`
    );
    return res.status(StatusCodes.OK).send(csvData);
  }

  if (format === 'markdown') {
    // Generate Markdown document matching the PDF template style
    let md = `# PROJECT TRACKER\n\n`;
    md += `*Exported on ${day().format('MMMM D, YYYY')} - Total Projects: ${projects.length}*\n\n---\n\n`;

    projects.forEach((p, idx) => {
      md += `## ${idx + 1}. ${p.title}\n\n`;
      if (p.description) {
        md += `> ${p.description}\n\n`;
      }
      const ghLink = p.githubUrl ? `[${p.githubUrl}](${p.githubUrl})` : 'N/A';
      md += `- **GitHub:** ${ghLink}\n`;
      md += `- **Project Type:** \`${p.projectType.toUpperCase()}\`\n`;
      md += `- **Status:** \`${p.projectStatus}\`\n\n`;

      if (p.components && p.components.length > 0) {
        md += `### Components & Architecture\n\n`;
        p.components.forEach((comp) => {
          md += `#### 📦 ${comp.name} (${comp.componentType})\n`;
          md += `- **Languages / Stack:** ${comp.languages || 'N/A'}\n`;
          md += `- **Deployed at:** ${comp.deployedAt || 'Not deployed yet'}\n`;
          if (comp.isEnvShared) {
            md += `- **Environment:** *(Shared)* ${comp.envNote || ''}\n`;
          }
          if (comp.envVariables?.trim()) {
            md += `\n\`\`\`bash\n# ${comp.name} .env variables\n${comp.envVariables.trim()}\n\`\`\`\n`;
          }
          md += `\n`;
        });
      }

      md += `---\n\n`;
    });

    res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="PROJECT_TRACKER-${day().format('YYYY-MM-DD')}.md"`
    );
    return res.status(StatusCodes.OK).send(md);
  }

  res.status(StatusCodes.BAD_REQUEST).json({ msg: 'invalid format specified' });
};

// Export individual component .env file
export const exportComponentEnv = async (req, res) => {
  const { id, componentId } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Project not found' });
  }

  const component = project.components.id(componentId);
  if (!component) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Component not found' });
  }

  const envContent = component.envVariables || `# No .env variables configured for ${component.name}\n`;
  const sanitizedName = component.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${sanitizedName}.env"`
  );
  return res.status(StatusCodes.OK).send(envContent);
};

// Aggregated Project Statistics
export const showProjectStats = async (req, res) => {
  const userObjectId = new mongoose.Types.ObjectId(req.user.userId);

  // Type breakdown
  const typeStatsAgg = await Project.aggregate([
    { $match: { createdBy: userObjectId } },
    { $group: { _id: '$projectType', count: { $sum: 1 } } },
  ]);

  const typeStats = typeStatsAgg.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  // Status breakdown
  const statusStatsAgg = await Project.aggregate([
    { $match: { createdBy: userObjectId } },
    { $group: { _id: '$projectStatus', count: { $sum: 1 } } },
  ]);

  const statusStats = statusStatsAgg.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  // Extract and count languages/technologies across all components
  const userProjects = await Project.find({ createdBy: userObjectId }).select(
    'components'
  );
  const techMap = {};

  userProjects.forEach((p) => {
    if (p.components) {
      p.components.forEach((c) => {
        if (c.languages) {
          const techs = c.languages
            .split(/[,/|]+/)
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

          techs.forEach((tech) => {
            const normalized = tech;
            techMap[normalized] = (techMap[normalized] || 0) + 1;
          });
        }
      });
    }
  });

  const topTechnologies = Object.entries(techMap)
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Monthly project creation timeline
  let monthlyProjects = await Project.aggregate([
    { $match: { createdBy: userObjectId } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyProjects = monthlyProjects
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

  res.status(StatusCodes.OK).json({
    typeStats,
    statusStats,
    topTechnologies,
    monthlyProjects,
  });
};
