import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: var(--background-secondary-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 0.4rem 0.85rem;
    border-radius: var(--border-radius-pill);
    box-shadow: var(--shadow-1);
    font-size: 0.875rem;
    font-weight: 600;
  }
  .logout-btn:hover {
    border-color: var(--primary-400);
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
    transform: translateY(-1px);
  }
  .img {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    object-fit: cover;
    border: 1.5px solid var(--primary-500);
  }
  .user-icon {
    font-size: 1.15rem;
    color: var(--primary-500);
  }
  .caret {
    font-size: 0.75rem;
    color: var(--text-secondary-color);
    transition: transform 0.2s ease;
  }
  .dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 140px;
    box-shadow: var(--shadow-3);
    border-radius: var(--border-radius-sm);
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    padding: 0.35rem;
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
    pointer-events: none;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: 50;
  }
  .show-dropdown {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  .dropdown-btn {
    border-radius: calc(var(--border-radius-sm) - 2px);
    padding: 0.5rem 0.75rem;
    background: transparent;
    border: none;
    color: var(--red-dark);
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0;
    text-transform: capitalize;
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: var(--transition);
  }
  .dropdown-btn:hover {
    background: var(--red-light);
  }
  .dark-theme .dropdown-btn:hover {
    background: rgba(220, 38, 38, 0.2);
    color: #fca5a5;
  }
`;

export default Wrapper;
