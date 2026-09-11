import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useQuery } from '@tanstack/react-query';
import CombinedChart from '../components/Doughnut';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats');
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      <CombinedChart data={defaultStats} />
      {monthlyApplications && monthlyApplications.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};
export default Stats;
