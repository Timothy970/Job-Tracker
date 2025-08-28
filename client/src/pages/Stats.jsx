import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
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
  const data = await queryClient.ensureQueryData(statsQuery);
  return null;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { defaultStats, monthlyApplications } = data;
  console.log('*********monthlyapps', monthlyApplications.length)

  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      <CombinedChart data={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
      </div>
    </>
  );
};
export default Stats;
