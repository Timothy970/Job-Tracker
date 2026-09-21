import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../utils/customFetch';
import { Link, useOutletContext } from 'react-router-dom';
import {
  FaBriefcase,
  FaPlus,
  FaList,
  FaChartBar,
  FaLaptopCode,
  FaFolderPlus,
  FaChartPie,
  FaArrowRight,
  FaClock,
  FaUserCheck,
  FaTimesCircle,
  FaLayerGroup,
  FaServer,
  FaMobileAlt,
} from 'react-icons/fa';

const jobsStatsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  },
};

const projectStatsQuery = {
  queryKey: ['project-stats'],
  queryFn: async () => {
    const response = await customFetch.get('/projects/stats');
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  await Promise.all([
    queryClient.ensureQueryData(jobsStatsQuery),
    queryClient.ensureQueryData(projectStatsQuery),
  ]);
  return null;
};

const DashboardOverview = () => {
  const { user } = useOutletContext() || {};
  const { data: jobsData } = useQuery(jobsStatsQuery);
  const { data: projectsData } = useQuery(projectStatsQuery);

  const defaultJobStats = jobsData?.defaultStats || {
    pending: 0,
    interview: 0,
    declined: 0,
  };
  const totalJobs =
    (defaultJobStats.pending || 0) +
    (defaultJobStats.interview || 0) +
    (defaultJobStats.declined || 0);

  const typeStats = projectsData?.typeStats || {};
  const totalProjects = Object.values(typeStats).reduce((a, b) => a + b, 0);
  const topTechs = projectsData?.topTechnologies || [];

  return (
    <Wrapper>
      <header className='overview-header'>
        <div className='welcome-text'>
          <h2>
            Welcome back, <span className='user-name'>{user?.name || 'Developer'}</span> 👋
          </h2>
          <p>Here is your unified workspace summary for Jobs and Projects.</p>
        </div>
      </header>

      <div className='modules-grid'>
        {/* ================= JOBS TRACKER MODULE ================= */}
        <div className='module-card module-jobs'>
          <div className='module-card-header'>
            <div className='module-badge badge-jobs'>
              <FaBriefcase /> <span>Jobs Tracker</span>
            </div>
            <Link to='all-jobs' className='module-link'>
              Explore Jobs <FaArrowRight />
            </Link>
          </div>

          <div className='module-body'>
            <div className='metric-hero'>
              <div className='metric-value'>{totalJobs}</div>
              <div className='metric-label'>Total Job Applications</div>
            </div>

            <div className='stats-mini-grid'>
              <div className='mini-stat stat-pending'>
                <div className='stat-icon'>
                  <FaClock />
                </div>
                <div className='stat-info'>
                  <span className='count'>{defaultJobStats.pending || 0}</span>
                  <span className='label'>Pending</span>
                </div>
              </div>

              <div className='mini-stat stat-interview'>
                <div className='stat-icon'>
                  <FaUserCheck />
                </div>
                <div className='stat-info'>
                  <span className='count'>{defaultJobStats.interview || 0}</span>
                  <span className='label'>Interviews</span>
                </div>
              </div>

              <div className='mini-stat stat-declined'>
                <div className='stat-icon'>
                  <FaTimesCircle />
                </div>
                <div className='stat-info'>
                  <span className='count'>{defaultJobStats.declined || 0}</span>
                  <span className='label'>Declined</span>
                </div>
              </div>
            </div>

            <div className='actions-group'>
              <Link to='all-jobs' className='action-btn btn-primary-jobs'>
                <FaList /> All Jobs
              </Link>
              <Link to='add-job' className='action-btn btn-outline-jobs'>
                <FaPlus /> Track Job
              </Link>
              <Link to='stats' className='action-btn btn-subtle-jobs'>
                <FaChartBar /> Analytics
              </Link>
            </div>
          </div>
        </div>

        {/* ================= PROJECTS PORTFOLIO MODULE ================= */}
        <div className='module-card module-projects'>
          <div className='module-card-header'>
            <div className='module-badge badge-projects'>
              <FaLaptopCode /> <span>Projects Portfolio</span>
            </div>
            <Link to='all-projects' className='module-link'>
              Explore Projects <FaArrowRight />
            </Link>
          </div>

          <div className='module-body'>
            <div className='metric-hero'>
              <div className='metric-value'>{totalProjects}</div>
              <div className='metric-label'>Total Active Projects</div>
            </div>

            <div className='stats-mini-grid'>
              <div className='mini-stat stat-fullstack'>
                <div className='stat-icon'>
                  <FaLayerGroup />
                </div>
                <div className='stat-info'>
                  <span className='count'>{typeStats['be_fe'] || 0}</span>
                  <span className='label'>Full-Stack</span>
                </div>
              </div>

              <div className='mini-stat stat-monolith'>
                <div className='stat-icon'>
                  <FaServer />
                </div>
                <div className='stat-info'>
                  <span className='count'>{typeStats['monolithic'] || 0}</span>
                  <span className='label'>Monoliths</span>
                </div>
              </div>

              <div className='mini-stat stat-mobile'>
                <div className='stat-icon'>
                  <FaMobileAlt />
                </div>
                <div className='stat-info'>
                  <span className='count'>
                    {(typeStats['mobile'] || 0) +
                      (typeStats['be_fe_mobile'] || 0) +
                      (typeStats['be_mobile'] || 0) +
                      (typeStats['fe_mobile'] || 0)}
                  </span>
                  <span className='label'>Mobile/Multi</span>
                </div>
              </div>
            </div>

            {topTechs.length > 0 && (
              <div className='tech-preview'>
                <span className='tech-title'>Top Tech Stack:</span>
                <div className='tech-tags'>
                  {topTechs.slice(0, 4).map((item) => (
                    <span key={item.tech} className='tech-chip'>
                      {item.tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className='actions-group'>
              <Link to='all-projects' className='action-btn btn-primary-projects'>
                <FaList /> All Projects
              </Link>
              <Link to='add-project' className='action-btn btn-outline-projects'>
                <FaFolderPlus /> Add Project
              </Link>
              <Link to='project-stats' className='action-btn btn-subtle-projects'>
                <FaChartPie /> Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .overview-header h2 {
    font-size: 1.75rem;
    font-weight: 800;
    margin-bottom: 0.25rem;
  }

  .user-name {
    color: var(--primary-500);
  }

  .overview-header p {
    color: var(--text-secondary-color);
    font-size: 0.95rem;
  }

  .modules-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.75rem;
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .module-card {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-2);
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
  }

  .module-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
  }

  .module-jobs::before {
    background: linear-gradient(90deg, #3b82f6, #1d4ed8);
  }

  .module-projects::before {
    background: linear-gradient(90deg, #10b981, #059669);
  }

  .module-card:hover {
    box-shadow: var(--shadow-3);
    transform: translateY(-2px);
  }

  .module-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .module-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.9rem;
    border-radius: var(--border-radius-pill);
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: -0.01em;
  }

  .badge-jobs {
    background: rgba(37, 99, 235, 0.12);
    color: #2563eb;
    border: 1px solid rgba(37, 99, 235, 0.25);
  }
  .dark-theme .badge-jobs {
    color: #60a5fa;
  }

  .badge-projects {
    background: rgba(16, 185, 129, 0.12);
    color: #059669;
    border: 1px solid rgba(16, 185, 129, 0.25);
  }
  .dark-theme .badge-projects {
    color: #34d399;
  }

  .module-link {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-secondary-color);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    transition: var(--transition);
  }

  .module-link:hover {
    color: var(--primary-500);
  }

  .metric-hero {
    margin-bottom: 1.5rem;
  }

  .metric-value {
    font-size: 2.75rem;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .metric-label {
    font-size: 0.875rem;
    color: var(--text-secondary-color);
    margin-top: 0.35rem;
    font-weight: 500;
  }

  .stats-mini-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .mini-stat {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .stat-icon {
    font-size: 1.15rem;
    display: grid;
    place-items: center;
  }

  .stat-pending .stat-icon {
    color: #d97706;
  }
  .stat-interview .stat-icon {
    color: #2563eb;
  }
  .stat-declined .stat-icon {
    color: #dc2626;
  }

  .stat-fullstack .stat-icon {
    color: #10b981;
  }
  .stat-monolith .stat-icon {
    color: #0d9488;
  }
  .stat-mobile .stat-icon {
    color: #6366f1;
  }

  .stat-info {
    display: flex;
    flex-direction: column;
  }

  .stat-info .count {
    font-weight: 700;
    font-size: 1.05rem;
    line-height: 1.1;
  }

  .stat-info .label {
    font-size: 0.72rem;
    color: var(--text-secondary-color);
    font-weight: 500;
  }

  .tech-preview {
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tech-title {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--text-secondary-color);
  }

  .tech-tags {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .tech-chip {
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: var(--border-radius-sm);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    font-weight: 600;
  }

  .actions-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    margin-top: auto;
  }

  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.55rem 0.5rem;
    border-radius: var(--border-radius-sm);
    font-size: 0.82rem;
    font-weight: 600;
    transition: var(--transition);
    text-align: center;
  }

  .btn-primary-jobs {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: var(--white);
  }
  .btn-primary-jobs:hover {
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  .btn-outline-jobs {
    background: transparent;
    border: 1px solid rgba(37, 99, 235, 0.3);
    color: #2563eb;
  }
  .dark-theme .btn-outline-jobs {
    color: #60a5fa;
  }
  .btn-outline-jobs:hover {
    background: rgba(37, 99, 235, 0.1);
  }

  .btn-subtle-jobs {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }
  .btn-subtle-jobs:hover {
    border-color: var(--primary-500);
  }

  .btn-primary-projects {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: var(--white);
  }
  .btn-primary-projects:hover {
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  }

  .btn-outline-projects {
    background: transparent;
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #059669;
  }
  .dark-theme .btn-outline-projects {
    color: #34d399;
  }
  .btn-outline-projects:hover {
    background: rgba(16, 185, 129, 0.1);
  }

  .btn-subtle-projects {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }
  .btn-subtle-projects:hover {
    border-color: #10b981;
  }
`;

export default DashboardOverview;
