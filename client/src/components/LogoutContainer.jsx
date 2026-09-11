import { FaUserCircle, FaChevronDown } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();

  return (
    <Wrapper>
      <button
        type='button'
        className='btn logout-btn'
        onClick={() => setShowLogout(!showLogout)}
        aria-expanded={showLogout}
        aria-label='User profile menu'
      >
        {user?.avatar ? (
          <img src={user.avatar} alt='avatar' className='img' />
        ) : (
          <FaUserCircle className='user-icon' />
        )}
        <span>{user?.name}</span>
        <FaChevronDown className='caret' />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type='button' className='dropdown-btn' onClick={logoutUser}>
          <FiLogOut /> logout
        </button>
      </div>
    </Wrapper>
  );
};
export default LogoutContainer;
