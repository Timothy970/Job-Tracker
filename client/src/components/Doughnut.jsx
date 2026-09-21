import React from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const Wrapper = styled.div`
  width: 100%;
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-2);
  padding: 1.75rem 1.5rem;
  margin-top: 2rem;
  transition: var(--transition);

  .chart-header {
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color-subtle);
  }

  .chart-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-color);
  }

  .charts-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .chart-container {
    width: 100%;
    position: relative;
  }

  .chart-container.no-data {
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary-color);
    font-weight: 500;
  }

  .bar-chart-container,
  .pie-chart-container {
    width: 100%;
  }

  @media (min-width: 992px) {
    .charts-wrapper {
      flex-direction: row;
      align-items: center;
    }

    .bar-chart-container {
      width: 60%;
    }

    .pie-chart-container {
      width: 40%;
    }
  }
`;

const defaultStats = {
  pending: 0,
  interview: 0,
  accepted: 0,
  declined: 0,
};

const renderLegendText = (value) => (
  <span style={{ color: 'var(--text-color)', fontWeight: 500, fontSize: '0.875rem' }}>
    {value}
  </span>
);

const CombinedChart = ({ data = defaultStats }) => {
  const barChartData = [
    {
      status: 'Pending',
      count: data.pending || 0,
      color: '#f59e0b',
    },
    {
      status: 'Interview',
      count: data.interview || 0,
      color: '#3b82f6',
    },
    {
      status: 'Accepted',
      count: data.accepted || 0,
      color: '#10b981',
    },
    {
      status: 'Declined',
      count: data.declined || 0,
      color: '#ef4444',
    },
  ];

  const pieChartData = Object.entries(data)
    .filter(([_, count]) => count > 0)
    .map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
    }));

  const COLORS = {
    pending: '#f59e0b',
    interview: '#3b82f6',
    accepted: '#10b981',
    declined: '#ef4444',
  };

  const totalApplications = Object.values(data).reduce((a, b) => a + b, 0);

  return (
    <Wrapper>
      <div className='chart-header'>
        <h4 className='chart-title'>Application Status Breakdown</h4>
      </div>
      {totalApplications === 0 ? (
        <div className='chart-container no-data'>
          <p>No application status data to display yet.</p>
        </div>
      ) : (
        <div className='charts-wrapper'>
          <div className='bar-chart-container'>
            <div className='chart-container'>
              <ResponsiveContainer width='100%' height={280}>
                <BarChart data={barChartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray='3 3' stroke='var(--border-color)' />
                  <XAxis dataKey='status' stroke='var(--text-secondary-color)' tick={{ fill: 'var(--text-secondary-color)' }} />
                  <YAxis allowDecimals={false} stroke='var(--text-secondary-color)' tick={{ fill: 'var(--text-secondary-color)' }} />
                  <Tooltip
                    formatter={(value) => [value, 'Applications']}
                    contentStyle={{
                      backgroundColor: 'var(--background-secondary-color)',
                      borderColor: 'var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-color)',
                      boxShadow: 'var(--shadow-2)',
                    }}
                    labelStyle={{ color: 'var(--text-color)', fontWeight: 600 }}
                  />
                  <Bar dataKey='count' barSize={55} radius={[6, 6, 0, 0]}>
                    {barChartData.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className='pie-chart-container'>
            <div className='chart-container'>
              <ResponsiveContainer width='100%' height={280}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx='50%'
                    cy='50%'
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey='value'
                  >
                    {pieChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[entry.name.toLowerCase()] || '#3b82f6'}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [value, 'Applications']}
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
                    formatter={renderLegendText}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default CombinedChart;