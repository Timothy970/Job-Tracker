import styled from 'styled-components';

const Wrapper = styled.aside`
  display: none;
  @media (min-width: 992px) {
    display: block;
    border-right: 1px solid var(--border-color);

    .sidebar-container {
      background: var(--background-secondary-color);
      min-height: 100vh;
      height: 100%;
      width: 260px;
      margin-left: -260px;
      transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .content {
      position: sticky;
      top: 0;
      padding: 1.5rem 1rem;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 4.5rem;
      display: flex;
      align-items: center;
      padding-left: 0.75rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--border-color-subtle);
    }
    .logo {
      width: 130px;
      height: auto;
    }
    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 0.8rem 1rem;
      border-radius: var(--border-radius-sm);
      text-transform: capitalize;
      font-weight: 500;
      font-size: 0.95rem;
      transition: all 0.2s ease;
      letter-spacing: 0;
    }
    .nav-link:hover {
      background: rgba(59, 130, 246, 0.08);
      color: var(--primary-600);
      transform: translateX(3px);
    }
    .dark-theme .nav-link:hover {
      background: rgba(59, 130, 246, 0.15);
      color: var(--primary-400);
    }
    .icon {
      font-size: 1.25rem;
      margin-right: 0.85rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }
    .active {
      color: var(--white);
      background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }
    .active:hover {
      color: var(--white);
      background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
      transform: none;
    }
    .active .icon {
      color: var(--white);
    }
  }
`;
export default Wrapper;
