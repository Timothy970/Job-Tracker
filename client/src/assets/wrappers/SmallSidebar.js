import styled from 'styled-components';

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }
  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    max-width: 380px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-4);
    padding: 3rem 1.75rem 2rem;
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    color: var(--grey-400);
    cursor: pointer;
    display: grid;
    place-items: center;
    padding: 0.25rem;
    border-radius: var(--border-radius-sm);
    transition: var(--transition);
  }
  .close-btn:hover {
    color: var(--red-dark);
    background: var(--red-light);
  }
  .logo {
    width: 130px;
    height: auto;
    margin-bottom: 1.5rem;
  }
  .nav-groups {
    width: 100%;
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
    padding: 0 0.5rem 0.2rem;
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
  }
  .nav-group-jobs .nav-group-header {
    color: #3b82f6;
  }
  .nav-group-projects .nav-group-header {
    color: #10b981;
  }
  .nav-links {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 0.7rem 1rem;
    border-radius: var(--border-radius-sm);
    text-transform: capitalize;
    font-weight: 500;
    font-size: 0.95rem;
    transition: var(--transition);
  }
  .nav-link:hover {
    color: var(--primary-600);
    background: rgba(59, 130, 246, 0.08);
  }
  .icon {
    font-size: 1.2rem;
    margin-right: 0.85rem;
    display: grid;
    place-items: center;
  }
  .active {
    color: var(--white) !important;
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%) !important;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }
  .active.nav-link-jobs {
    background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;
  }
  .active.nav-link-projects {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  }
  .active:hover {
    color: var(--white);
  }
  .active .icon {
    color: var(--white);
  }
`;
export default Wrapper;
