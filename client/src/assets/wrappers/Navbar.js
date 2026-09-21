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
    gap: 0.75rem;
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
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .domain-badge {
    font-size: 0.85rem;
    font-weight: 700;
    padding: 0.3rem 0.8rem;
    border-radius: var(--border-radius-pill);
    letter-spacing: -0.01em;
    display: inline-flex;
    align-items: center;
    transition: var(--transition);
  }
  .domain-badge-overview {
    background: rgba(99, 102, 241, 0.12);
    color: #6366f1;
    border: 1px solid rgba(99, 102, 241, 0.25);
  }
  .domain-badge-jobs {
    background: rgba(37, 99, 235, 0.12);
    color: #2563eb;
    border: 1px solid rgba(37, 99, 235, 0.25);
  }
  .dark-theme .domain-badge-jobs {
    color: #60a5fa;
  }
  .domain-badge-projects {
    background: rgba(16, 185, 129, 0.12);
    color: #059669;
    border: 1px solid rgba(16, 185, 129, 0.25);
  }
  .dark-theme .domain-badge-projects {
    color: #34d399;
  }
  .domain-badge-account {
    background: rgba(100, 116, 139, 0.12);
    color: #475569;
    border: 1px solid rgba(100, 116, 139, 0.25);
  }
  .dark-theme .domain-badge-account {
    color: #cbd5e1;
  }

  /* Workspace switcher pill container */
  .workspace-switcher {
    display: flex;
    align-items: center;
    background: var(--input-bg);
    padding: 0.25rem;
    border-radius: var(--border-radius-pill);
    border: 1px solid var(--border-color);
    gap: 0.25rem;
  }

  .switcher-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.85rem;
    border-radius: var(--border-radius-pill);
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-secondary-color);
    transition: var(--transition);
  }

  .switcher-btn:hover {
    color: var(--text-color);
  }

  .switcher-btn.active-jobs {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
    color: var(--white);
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
  }

  .switcher-btn.active-projects {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: var(--white);
    box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
  }

  .btn-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  @media (max-width: 600px) {
    .workspace-switcher span {
      display: none;
    }
    .switcher-btn {
      padding: 0.4rem 0.6rem;
    }
  }

  @media (min-width: 992px) {
    .nav-center {
      width: 94%;
    }
    .nav-brand .logo-brand {
      display: none;
    }
    .btn-container {
      gap: 0.75rem;
    }
  }
`;
export default Wrapper;
