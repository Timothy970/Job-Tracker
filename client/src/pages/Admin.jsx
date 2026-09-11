import { useState } from 'react';
import { useLoaderData, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import Wrapper from '../assets/wrappers/AdminPage';
import { toast } from 'react-toastify';
import { StatItem } from '../components';
import day from 'dayjs';
import {
  FaUsers,
  FaBriefcase,
  FaCalendarCheck,
  FaClock,
  FaBuilding,
  FaMapMarkerAlt,
  FaChartPie,
  FaChartLine,
  FaUserShield,
  FaPrint,
  FaLayerGroup,
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const loader = async () => {
  try {
    const response = await customFetch.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error('You are not authorized to view this page');
    return redirect('/dashboard');
  }
};

const Admin = () => {
  const data = useLoaderData();
  const {
    users = 0,
    jobs = 0,
    statusStats = { pending: 0, interview: 0, accepted: 0, declined: 0 },
    typeStats = {},
    monthlyApplications = [],
    topCompanies = [],
    topLocations = [],
    recentUsers = [],
    recentJobs = [],
  } = data;

  const [chartType, setChartType] = useState('area');

  // Chart data preparation
  const pieData = [
    { name: 'Pending', value: statusStats.pending || 0, color: '#f59e0b' },
    { name: 'Interview', value: statusStats.interview || 0, color: '#3b82f6' },
    { name: 'Accepted', value: statusStats.accepted || 0, color: '#10b981' },
    { name: 'Declined', value: statusStats.declined || 0, color: '#ef4444' },
  ].filter((item) => item.value > 0);

  const totalTypes = Object.values(typeStats).reduce((a, b) => a + b, 0) || 1;
  const maxCompanyCount = topCompanies[0]?.count || 1;
  const maxLocationCount = topLocations[0]?.count || 1;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Wrapper>
      {/* Header Bar */}
      <div className='admin-header'>
        <div className='admin-title-group'>
          <h3>
            <FaUserShield style={{ color: 'var(--primary-500)' }} /> System Administration & Platform Intelligence
          </h3>
          <p>Real-time platform metrics, user demographics, and recruitment pipeline analytics</p>
        </div>
        <div className='admin-actions'>
          <button type='button' className='print-btn' onClick={handlePrint}>
            <FaPrint /> Print / Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className='stats-grid'>
        <StatItem
          title='Registered Users'
          count={users}
          color='#3b82f6'
          bcg='rgba(59, 130, 246, 0.15)'
          icon={<FaUsers />}
        />
        <StatItem
          title='Applications Tracked'
          count={jobs}
          color='#6366f1'
          bcg='rgba(99, 102, 241, 0.15)'
          icon={<FaBriefcase />}
        />
        <StatItem
          title='Offers Accepted'
          count={statusStats.accepted || 0}
          color='#10b981'
          bcg='rgba(16, 185, 129, 0.15)'
          icon={<FaCalendarCheck />}
        />
        <StatItem
          title='Interviews Scheduled'
          count={statusStats.interview || 0}
          color='#8b5cf6'
          bcg='rgba(139, 92, 246, 0.15)'
          icon={<FaCalendarCheck />}
        />
        <StatItem
          title='Pending Submissions'
          count={statusStats.pending || 0}
          color='#f59e0b'
          bcg='rgba(245, 158, 11, 0.15)'
          icon={<FaClock />}
        />
      </div>

      {/* Charts Grid */}
      <div className='charts-grid'>
        {/* Platform Velocity Trend */}
        <div className='admin-card'>
          <div className='card-header'>
            <h4>
              <FaChartLine style={{ color: 'var(--primary-500)' }} /> Platform Application Velocity
            </h4>
            <button
              type='button'
              className='btn btn-hipster'
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem' }}
              onClick={() => setChartType(chartType === 'area' ? 'bar' : 'area')}
            >
              Toggle {chartType === 'area' ? 'Bar View' : 'Area View'}
            </button>
          </div>
          {monthlyApplications.length === 0 ? (
            <div className='empty-msg'>No monthly application trend data available yet.</div>
          ) : (
            <ResponsiveContainer width='100%' height={260}>
              {chartType === 'area' ? (
                <AreaChart data={monthlyApplications} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id='adminVelocity' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#3b82f6' stopOpacity={0.4} />
                      <stop offset='95%' stopColor='#3b82f6' stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' stroke='var(--border-color)' />
                  <XAxis dataKey='date' stroke='var(--text-secondary-color)' tick={{ fill: 'var(--text-secondary-color)' }} />
                  <YAxis allowDecimals={false} stroke='var(--text-secondary-color)' tick={{ fill: 'var(--text-secondary-color)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background-secondary-color)',
                      borderColor: 'var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-color)',
                      boxShadow: 'var(--shadow-2)',
                    }}
                  />
                  <Area type='monotone' dataKey='count' stroke='#2563eb' strokeWidth={3} fill='url(#adminVelocity)' />
                </AreaChart>
              ) : (
                <BarChart data={monthlyApplications} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray='3 3' stroke='var(--border-color)' />
                  <XAxis dataKey='date' stroke='var(--text-secondary-color)' tick={{ fill: 'var(--text-secondary-color)' }} />
                  <YAxis allowDecimals={false} stroke='var(--text-secondary-color)' tick={{ fill: 'var(--text-secondary-color)' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background-secondary-color)',
                      borderColor: 'var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-color)',
                      boxShadow: 'var(--shadow-2)',
                    }}
                  />
                  <Bar dataKey='count' fill='#3b82f6' radius={[6, 6, 0, 0]} barSize={45} />
                </BarChart>
              )}
            </ResponsiveContainer>
          )}
        </div>

        {/* Global Status Distribution */}
        <div className='admin-card'>
          <div className='card-header'>
            <h4>
              <FaChartPie style={{ color: '#10b981' }} /> Status Distribution
            </h4>
          </div>
          {pieData.length === 0 ? (
            <div className='empty-msg'>No status data to display yet.</div>
          ) : (
            <ResponsiveContainer width='100%' height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey='value'
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background-secondary-color)',
                    borderColor: 'var(--border-color)',
                    borderRadius: '8px',
                    color: 'var(--text-color)',
                    boxShadow: 'var(--shadow-2)',
                  }}
                />
                <Legend
                  verticalAlign='bottom'
                  height={36}
                  formatter={(value) => (
                    <span style={{ color: 'var(--text-color)', fontWeight: 500, fontSize: '0.85rem' }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Insights Breakdown: Top Companies, Top Locations, Job Types */}
      <div className='insights-grid'>
        {/* Top Companies */}
        <div className='admin-card'>
          <div className='card-header'>
            <h4>
              <FaBuilding style={{ color: 'var(--primary-500)' }} /> Top Target Companies
            </h4>
          </div>
          {topCompanies.length === 0 ? (
            <div className='empty-msg'>No company data available.</div>
          ) : (
            <div className='rank-list'>
              {topCompanies.map((item, index) => (
                <div key={item.name} className='rank-item'>
                  <div className='rank-info'>
                    <span className='rank-name'>
                      <span className='rank-badge'>{index + 1}</span> {item.name}
                    </span>
                    <span className='rank-count'>{item.count} apps</span>
                  </div>
                  <div className='progress-bar'>
                    <div
                      className='progress-fill'
                      style={{
                        width: `${(item.count / maxCompanyCount) * 100}%`,
                        background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Locations */}
        <div className='admin-card'>
          <div className='card-header'>
            <h4>
              <FaMapMarkerAlt style={{ color: '#ef4444' }} /> Top Locations
            </h4>
          </div>
          {topLocations.length === 0 ? (
            <div className='empty-msg'>No location data available.</div>
          ) : (
            <div className='rank-list'>
              {topLocations.map((item, index) => (
                <div key={item.name} className='rank-item'>
                  <div className='rank-info'>
                    <span className='rank-name'>
                      <span className='rank-badge' style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#dc2626' }}>
                        {index + 1}
                      </span>{' '}
                      {item.name}
                    </span>
                    <span className='rank-count'>{item.count} apps</span>
                  </div>
                  <div className='progress-bar'>
                    <div
                      className='progress-fill'
                      style={{
                        width: `${(item.count / maxLocationCount) * 100}%`,
                        background: 'linear-gradient(90deg, #ef4444, #f87171)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Types Breakdown */}
        <div className='admin-card'>
          <div className='card-header'>
            <h4>
              <FaLayerGroup style={{ color: '#8b5cf6' }} /> Contract Types
            </h4>
          </div>
          <div className='rank-list'>
            {['full-time', 'part-time', 'internship'].map((type) => {
              const count = typeStats[type] || 0;
              const percent = Math.round((count / totalTypes) * 100);
              const color =
                type === 'full-time'
                  ? 'linear-gradient(90deg, #10b981, #34d399)'
                  : type === 'part-time'
                  ? 'linear-gradient(90deg, #3b82f6, #60a5fa)'
                  : 'linear-gradient(90deg, #8b5cf6, #a78bfa)';
              return (
                <div key={type} className='rank-item'>
                  <div className='rank-info'>
                    <span className='rank-name' style={{ textTransform: 'capitalize' }}>
                      {type.replace('-', ' ')}
                    </span>
                    <span className='rank-count'>
                      {count} ({percent}%)
                    </span>
                  </div>
                  <div className='progress-bar'>
                    <div className='progress-fill' style={{ width: `${percent}%`, background: color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Users Roster Table */}
      <div className='admin-card'>
        <div className='card-header'>
          <h4>
            <FaUsers style={{ color: 'var(--primary-500)' }} /> Recent Registered Candidates
          </h4>
        </div>
        <div className='table-responsive'>
          <table>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Location</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => {
                const joinedDate = u.createdAt ? day(u.createdAt).format('MMM D, YYYY') : 'Recent';
                return (
                  <tr key={u._id}>
                    <td>
                      <div className='user-cell'>
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className='avatar-sm' />
                        ) : (
                          <div className='avatar-sm'>{u.name?.charAt(0)}</div>
                        )}
                        <span style={{ fontWeight: 600 }}>
                          {u.name} {u.lastName}
                        </span>
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.location}</td>
                    <td>
                      <span className={`role-badge ${u.role === 'admin' ? 'role-admin' : 'role-user'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>{joinedDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Live Applications Feed Table */}
      <div className='admin-card'>
        <div className='card-header'>
          <h4>
            <FaBriefcase style={{ color: '#10b981' }} /> Live Platform Application Activity
          </h4>
        </div>
        <div className='table-responsive'>
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Company</th>
                <th>Location</th>
                <th>Type</th>
                <th>Candidate</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.length === 0 ? (
                <tr>
                  <td colSpan='7' className='empty-msg'>
                    No applications recorded yet.
                  </td>
                </tr>
              ) : (
                recentJobs.map((j) => {
                  const jobDate = day(j.createdAt).format('MMM D, YYYY');
                  const candidateName = j.createdBy
                    ? `${j.createdBy.name || ''} ${j.createdBy.lastName || ''}`.trim() || j.createdBy.email
                    : 'Candidate';
                  return (
                    <tr key={j._id}>
                      <td style={{ fontWeight: 600 }}>{j.position}</td>
                      <td>{j.company}</td>
                      <td>{j.jobLocation}</td>
                      <td style={{ textTransform: 'capitalize' }}>{j.jobType?.replace('-', ' ')}</td>
                      <td>{candidateName}</td>
                      <td>
                        <span className={`status ${j.jobStatus}`}>{j.jobStatus}</span>
                      </td>
                      <td>{jobDate}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default Admin;
