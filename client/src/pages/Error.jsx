import { Link, useRouteError } from 'react-router-dom';
import Wrapper from '../assets/wrappers/ErrorPage';
import img from '../assets/images/not-found.svg';
import { FiArrowLeft, FiAlertTriangle } from 'react-icons/fi';

const ErrorPage = () => {
  const error = useRouteError();

  if (error?.status === 404) {
    return (
      <Wrapper>
        <div className='error-card'>
          <img src={img} alt='not found' />
          <h3>Page Not Found</h3>
          <p>We couldn't find the page you are looking for. It might have been removed or the URL is incorrect.</p>
          <Link to='/dashboard' className='btn back-btn'>
            <FiArrowLeft /> Back to Dashboard
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className='error-card'>
        <FiAlertTriangle style={{ fontSize: '3rem', color: '#ef4444', marginBottom: '1rem' }} />
        <h3>Something went wrong</h3>
        <p>An unexpected error occurred. Please try refreshing or return to the dashboard.</p>
        <Link to='/dashboard' className='btn back-btn'>
          <FiArrowLeft /> Back to Dashboard
        </Link>
      </div>
    </Wrapper>
  );
};
export default ErrorPage;
