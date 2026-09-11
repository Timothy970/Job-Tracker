import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboardContext();
  return (
    <Wrapper onClick={toggleDarkTheme} aria-label='Toggle light/dark mode'>
      {isDarkTheme ? (
        <BsFillSunFill className='sun-icon' />
      ) : (
        <BsFillMoonFill className='moon-icon' />
      )}
    </Wrapper>
  );
};
export default ThemeToggle;
