import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';
import { useAllJobsContext } from '../pages/AllJobs';
import PageBtnContainer from './PageBtnContainer';
import { FaBriefcase, FaPlus, FaUndo } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobsContainer = () => {
  const { data, searchValues } = useAllJobsContext();

  const { jobs = [], totalJobs = 0, numOfPages = 1 } = data || {};
  if (jobs.length === 0) {
    const hasFilters =
      searchValues?.search ||
      (searchValues?.jobStatus && searchValues.jobStatus !== 'all') ||
      (searchValues?.jobType && searchValues.jobType !== 'all');

    return (
      <Wrapper>
        <div className='empty-state-card'>
          <div className='empty-icon-wrapper empty-icon-jobs'>
            <FaBriefcase />
          </div>
          <h3>No Job Applications Found</h3>
          <p>
            {hasFilters
              ? "We couldn't find any job applications matching your search or filter options. Try clearing filters or track a new application."
              : 'You have not added any job applications yet. Track your job applications, interview statuses, and locations in one place.'}
          </p>
          <div className='empty-actions'>
            <Link to='/dashboard/add-job' className='btn btn-primary-jobs'>
              <FaPlus /> Track New Job
            </Link>
            {hasFilters && (
              <Link to='/dashboard/all-jobs' className='btn btn-hipster'>
                <FaUndo /> Reset Filters
              </Link>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
