import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import StatItem from '../components/StatItem';
import {
  FaLaptopCode,
  FaServer,
  FaMobileAlt,
  FaLayerGroup,
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';

const projectStatsQuery = {
  queryKey: ['project-stats'],
  queryFn: async () => {
    const response = await customFetch.get('/projects/stats');
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(projectStatsQuery);
  return null;
};

const ProjectStats = () => {
  const { data } = useQuery(projectStatsQuery);
  const {
    typeStats = {},
    topTechnologies = [],
    monthlyProjects = [],
  } = data || {};

  const totalProjects = Object.values(typeStats).reduce((a, b) => a + b, 0);

  const statsList = [
    {
      title: 'Total Projects',
      count: totalProjects,
      icon: <FaLaptopCode />,
      color: '#2cb1bc',
      bcg: '#cef7f6',
    },
    {
      title: 'BE & FE Projects',
      count: typeStats['be_fe'] || 0,
      icon: <FaLayerGroup />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Mobile / Multi-Platform',
      count:
        (typeStats['mobile'] || 0) +
        (typeStats['be_fe_mobile'] || 0) +
        (typeStats['be_mobile'] || 0) +
        (typeStats['fe_mobile'] || 0),
      icon: <FaMobileAlt />,
      color: '#6366f1',
      bcg: '#e0e7ff',
    },
    {
      title: 'Monolithic Apps',
      count: typeStats['monolithic'] || 0,
      icon: <FaServer />,
      color: '#10b981',
      bcg: '#d1fae5',
    },
  ];

  return (
    <Wrapper>
      {/* Stat Cards */}
      <div className="stats-container">
        {statsList.map((item) => {
          return <StatItem key={item.title} {...item} />;
        })}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {topTechnologies.length > 0 && (
          <div className="chart-card">
            <h4>Top Technologies & Frameworks Across Projects</h4>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topTechnologies} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="tech" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2cb1bc" barSize={18} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {monthlyProjects.length > 0 && (
          <div className="chart-card">
            <h4>Monthly Projects Added</h4>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyProjects} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Area type="monotone" dataKey="count" stroke="#2cb1bc" fill="#bef8fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .stats-container {
    display: grid;
    row-gap: 2rem;
    margin-bottom: 2.5rem;
    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
      column-gap: 1rem;
    }
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .chart-card {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-2);
    border: 1px solid var(--grey-100);

    h4 {
      text-align: center;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  .chart-wrapper {
    width: 100%;
    min-height: 300px;
  }
`;

export default ProjectStats;
