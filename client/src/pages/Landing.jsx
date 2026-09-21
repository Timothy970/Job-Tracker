import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/side.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';
import { FiCheckCircle, FiMoon, FiPieChart } from 'react-icons/fi';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
        <div className='nav-cta'>
          <Link to='/login' className='btn btn-hipster login-btn'>
            Sign In
          </Link>
          <Link to='/register' className='btn register-btn'>
            Get Started
          </Link>
        </div>
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Track applications. <br />
            <span>Land your dream job.</span>
          </h1>
          <p>
            JobTrackr is your intelligent career management companion. Organize every application, monitor interviews, track job statuses in real-time, and gain actionable visual insights into your job hunt journey.
          </p>
          <div className='cta-group'>
            <Link to='/register' className='btn register-btn'>
              Start Tracking Free
            </Link>
            <Link to='/login' className='btn btn-hipster login-btn'>
              Sign In to Account
            </Link>
          </div>
          <div className='feature-tags'>
            <div className='feature-item'>
              <FiCheckCircle style={{ color: 'var(--primary-500)' }} /> Status Pipeline
            </div>
            <div className='feature-item'>
              <FiPieChart style={{ color: '#10b981' }} /> Interactive Analytics
            </div>
            <div className='feature-item'>
              <FiMoon style={{ color: '#8b5cf6' }} /> Dark & Light Mode
            </div>
          </div>
        </div>
        <div className='main-img-wrapper'>
          <img src={main} alt='job hunt illustration' className='img main-img' />
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
