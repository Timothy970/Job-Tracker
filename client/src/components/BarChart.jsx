import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
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
          labelStyle={{ color: 'var(--text-color)', fontWeight: 600 }}
        />
        <Bar dataKey='count' fill='#3b82f6' barSize={50} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartComponent;
