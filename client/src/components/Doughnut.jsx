import React from 'react';
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
    Legend
} from 'recharts';

// Sample data based on your defaultStats
const defaultStats = {
    "pending": 2,
    "interview": 0,
    "declined": 0
};

const CombinedChart = ({ data = defaultStats }) => {
    // Transform data for bar chart
    const barChartData = Object.entries(data).map(([status, count]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        count: count,
        // Add color property to each data point
        color: status === 'pending' ? '#f59e0b' :
            status === 'interview' ? '#10b981' : '#ef4444'
    }));

    // Transform data for pie chart (doughnut)
    const pieChartData = Object.entries(data)
        .filter(([_, count]) => count > 0) // Only show non-zero values
        .map(([status, count]) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: count
        }));

    // Colors for the charts
    const COLORS = {
        pending: '#f59e0b',
        interview: '#10b981',
        declined: '#ef4444'
    };

    const BAR_COLORS = ['#f59e0b', '#10b981', '#ef4444'];

    const StatsBarChart = ({ data = barChartData }) => {
        return (
            <div className="chart-container">
                <ResponsiveContainer width='100%' height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis dataKey='status' />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            formatter={(value) => [value, 'Applications']}
                            labelStyle={{ color: '#374151' }}
                            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #d1d5db' }}
                        />
                        <Bar dataKey='count' barSize={75} radius={[4, 4, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    };

    const StatsDoughnutChart = ({ data = pieChartData }) => {
        // If no data to show, display a message
        if (data.length === 0) {
            return (
                <div className="chart-container no-data">
                    <p>No data to display</p>
                </div>
            );
        }

        return (
            <div className="chart-container">
                <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx='50%'
                            cy='50%'
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[entry.name.toLowerCase()] || BAR_COLORS[index % BAR_COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => [value, 'Applications']}
                            contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #d1d5db' }}
                        />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={(value) => <span style={{ color: '#374151' }}>{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        );
    };

    return (
        <div className="combined-chart-container">
            <div className="charts-wrapper">
                <div className="bar-chart-container">
                    <StatsBarChart data={barChartData} />
                </div>
                <div className="pie-chart-container">
                    <StatsDoughnutChart data={pieChartData} />
                </div>
            </div>

            <style jsx>{`
                .combined-chart-container {
                    width: 100%;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin-top: 20px;
                    box-sizing: border-box;
                }
                                
                .charts-wrapper {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                
                .chart-container {
                    width: 100%;
                    position: relative;
                }
                
                .chart-container.no-data {
                    height: 300px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6b7280;
                }
                
                .bar-chart-container,
                .pie-chart-container {
                    width: 100%;
                }
                
                @media (min-width: 768px) {
                    .charts-wrapper {
                        flex-direction: row;
                    }
                    
                    .bar-chart-container {
                        width: 66.66%;
                    }
                    
                    .pie-chart-container {
                        width: 33.33%;
                    }
                }
            `}</style>
        </div>
    );
};

export default CombinedChart;