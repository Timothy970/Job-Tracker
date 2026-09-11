import logo from '../assets/images/log.png';

const Logo = () => {
  return (
    <img
      src={logo}
      alt='JobTrackr'
      className='logo'
      style={{ maxWidth: '140px', maxHeight: '45px', objectFit: 'contain' }}
    />
  );
};

export default Logo;
