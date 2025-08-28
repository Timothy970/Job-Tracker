import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/side.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
JobTrackr is your personal job application assistant, helping you stay organized and motivated throughout your search. Log and manage all your applications in one place — from applying to interviews to final decisions. Add notes, set reminders, and attach documents so you’re always prepared. Track your progress with stats and charts that show interviews, rejections, and offers, giving you valuable insight into your journey.
          </p>
          <Link to='/register' className='btn register-link'>
            Register
          </Link>
          <Link to='/login' className='btn '>
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;
