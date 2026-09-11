const Logo = () => {
  return (
    <div className='logo-brand'>
      <svg
        width='36'
        height='36'
        viewBox='0 0 40 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='40' height='40' rx='10' fill='url(#jobTrackrGrad)' />
        <path
          d='M11 20.5L17 26.5L29 13.5'
          stroke='white'
          strokeWidth='3.8'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <defs>
          <linearGradient
            id='jobTrackrGrad'
            x1='0'
            y1='0'
            x2='40'
            y2='40'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3b82f6' />
            <stop offset='1' stopColor='#1d4ed8' />
          </linearGradient>
        </defs>
      </svg>
      <span className='brand-text'>
        Job<span>Trackr</span>
      </span>
    </div>
  );
};

export default Logo;
