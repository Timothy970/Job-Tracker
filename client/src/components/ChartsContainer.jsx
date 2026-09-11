import { useState } from 'react';
import BarChart from './BarChart';
import AreaChart from './AreaChart';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { FiBarChart2, FiActivity } from 'react-icons/fi';

const ChartsContainer = ({ data }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <div className='chart-header'>
        <h4>Monthly Applications Trend</h4>
        <button
          type='button'
          className='toggle-btn'
          onClick={() => setBarChart(!barChart)}
        >
          {barChart ? (
            <>
              <FiActivity /> Switch to Area Chart
            </>
          ) : (
            <>
              <FiBarChart2 /> Switch to Bar Chart
            </>
          )}
        </button>
      </div>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};
export default ChartsContainer;
