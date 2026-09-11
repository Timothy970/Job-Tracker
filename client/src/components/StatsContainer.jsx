import { FaClock, FaCalendarCheck, FaTimesCircle } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';

const StatsContainer = ({ defaultStats }) => {
  const stats = [
    {
      title: 'pending applications',
      count: defaultStats?.pending || 0,
      icon: <FaClock />,
      color: '#f59e0b',
      bcg: 'rgba(245, 158, 11, 0.15)',
    },
    {
      title: 'interviews scheduled',
      count: defaultStats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#3b82f6',
      bcg: 'rgba(59, 130, 246, 0.15)',
    },
    {
      title: 'jobs declined',
      count: defaultStats?.declined || 0,
      icon: <FaTimesCircle />,
      color: '#ef4444',
      bcg: 'rgba(239, 68, 68, 0.15)',
    },
  ];
  return (
    <Wrapper>
      {stats.map((item) => {
        return <StatItem key={item.title} {...item} />;
      })}
    </Wrapper>
  );
};
export default StatsContainer;
