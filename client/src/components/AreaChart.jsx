import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const AreaChartComponent = ({ data }) => {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id='colorCount' x1='0' y1='0' x2='0' y2='1'>
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
          labelStyle={{ color: 'var(--text-color)', fontWeight: 600 }}
        />
        <Area
          type='monotone'
          dataKey='count'
          stroke='#2563eb'
          strokeWidth={3}
          fillOpacity={1}
          fill='url(#colorCount)'
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default AreaChartComponent;
