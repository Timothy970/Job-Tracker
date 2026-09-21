import { MdOutlineDashboard, MdQueryStats, MdAdminPanelSettings } from 'react-icons/md';
import { IoBarChartSharp } from 'react-icons/io5';
import { FaWpforms, FaLaptopCode, FaFolderPlus, FaBriefcase, FaCodeBranch } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { AiOutlineFundProjectionScreen } from 'react-icons/ai';

export const linkGroups = [
  {
    category: 'Overview',
    items: [
      {
        text: 'overview',
        path: '.',
        icon: <MdOutlineDashboard />,
        module: 'overview',
      },
    ],
  },
  {
    category: 'Jobs Tracker',
    icon: <FaBriefcase />,
    module: 'jobs',
    items: [
      {
        text: 'all jobs',
        path: 'all-jobs',
        icon: <MdQueryStats />,
        module: 'jobs',
      },
      {
        text: 'add job',
        path: 'add-job',
        icon: <FaWpforms />,
        module: 'jobs',
      },
      {
        text: 'job stats',
        path: 'stats',
        icon: <IoBarChartSharp />,
        module: 'jobs',
      },
    ],
  },
  {
    category: 'Projects Portfolio',
    icon: <FaCodeBranch />,
    module: 'projects',
    items: [
      {
        text: 'all projects',
        path: 'all-projects',
        icon: <FaLaptopCode />,
        module: 'projects',
      },
      {
        text: 'add project',
        path: 'add-project',
        icon: <FaFolderPlus />,
        module: 'projects',
      },
      {
        text: 'project stats',
        path: 'project-stats',
        icon: <AiOutlineFundProjectionScreen />,
        module: 'projects',
      },
    ],
  },
  {
    category: 'Account & System',
    items: [
      {
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
        module: 'account',
      },
      {
        text: 'admin',
        path: 'admin',
        icon: <MdAdminPanelSettings />,
        module: 'account',
      },
    ],
  },
];

const links = linkGroups.flatMap((group) => group.items);

export default links;

