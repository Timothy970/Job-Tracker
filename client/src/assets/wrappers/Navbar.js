import styled from 'styled-components';

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  background: var(--navbar-bg);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 20;

  .nav-center {
    display: flex;
    width: 92vw;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
  }
  .toggle-btn {
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    width: 38px;
    height: 38px;
    min-width: 38px;
    font-size: 1.15rem;
    color: var(--primary-600);
    cursor: pointer;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .toggle-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: var(--primary-700);
  }
  .logo-text {
    display: none;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-color);
    letter-spacing: -0.02em;
    text-transform: capitalize;
  }
  .nav-brand {
    display: flex;
    align-items: center;
  }
  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  @media (min-width: 992px) {
    .nav-center {
      width: 94%;
    }
    .nav-brand .logo-brand {
      display: none;
    }
    .logo-text {
      display: block;
    }
    .btn-container {
      gap: 0.75rem;
    }
  }
`;
export default Wrapper;
