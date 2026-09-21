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
      width: 275px;
      margin-left: -275px;
      transition: margin-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .content {
      position: sticky;
      top: 0;
      padding: 1.25rem 1rem 2rem;
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    .show-sidebar {
      margin-left: 0;
    }
    header {
      height: 4rem;
      display: flex;
      align-items: center;
      padding-left: 0.5rem;
      margin-bottom: 1.25rem;
      border-bottom: 1px solid var(--border-color-subtle);
    }
    .logo {
      width: 135px;
      height: auto;
    }

    .nav-groups {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .nav-group {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .nav-group-header {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0 0.6rem 0.2rem;
      text-transform: uppercase;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--grey-400);
    }

    .group-icon {
      font-size: 0.8rem;
      display: grid;
      place-items: center;
      opacity: 0.8;
    }

    .nav-group-jobs .nav-group-header {
      color: #3b82f6;
    }
    .nav-group-projects .nav-group-header {
      color: #10b981;
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      color: var(--text-secondary-color);
      padding: 0.65rem 0.85rem;
      border-radius: var(--border-radius-sm);
      text-transform: capitalize;
      font-weight: 500;
      font-size: 0.9rem;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      letter-spacing: 0;
      position: relative;
    }

    .nav-link:hover {
      background: rgba(59, 130, 246, 0.08);
      color: var(--primary-600);
      transform: translateX(3px);
    }

    .dark-theme .nav-link:hover {
      background: rgba(255, 255, 255, 0.05);
      color: var(--text-color);
    }

    .icon {
      font-size: 1.15rem;
      margin-right: 0.75rem;
      display: grid;
      place-items: center;
      transition: var(--transition);
    }

    /* Active states */
    .active {
      color: var(--white) !important;
      background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%) !important;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
      transform: none !important;
    }

    .active.nav-link-jobs {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
    }

    .active.nav-link-projects {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
    }

    .active .icon {
      color: var(--white);
    }
  }
`;
export default Wrapper;
