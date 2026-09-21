import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft, FaBriefcase, FaCodeBranch } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import { useLocation, NavLink } from 'react-router-dom';

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  const location = useLocation();
  const path = location.pathname;

  let currentDomain = 'overview';
  let domainTitle = 'Overview Dashboard';

  if (path.includes('job') || (path.includes('stats') && !path.includes('project'))) {
    currentDomain = 'jobs';
    domainTitle = 'Jobs Tracker';
  } else if (path.includes('project')) {
    currentDomain = 'projects';
    domainTitle = 'Projects Portfolio';
  } else if (path.includes('profile') || path.includes('admin')) {
    currentDomain = 'account';
    domainTitle = 'Account & System';
  }

  return (
    <Wrapper>
      <div className='nav-center'>
        <button
          type='button'
          className='toggle-btn'
          onClick={toggleSidebar}
          aria-label='Toggle navigation menu'
        >
          <FaAlignLeft />
        </button>
        <div className='nav-brand'>
          <Logo />
          <div className='breadcrumbs'>
            <span className={`domain-badge domain-badge-${currentDomain}`}>
              {domainTitle}
            </span>
          </div>
        </div>

        <div className='workspace-switcher'>
          <NavLink
            to='all-jobs'
            className={`switcher-btn ${
              currentDomain === 'jobs' ? 'active-jobs' : ''
            }`}
          >
            <FaBriefcase /> <span>Jobs</span>
          </NavLink>
          <NavLink
            to='all-projects'
            className={`switcher-btn ${
              currentDomain === 'projects' ? 'active-projects' : ''
            }`}
          >
            <FaCodeBranch /> <span>Projects</span>
          </NavLink>
        </div>

        <div className='btn-container'>
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
