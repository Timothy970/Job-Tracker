import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 2rem;
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-2);
  padding: 1.75rem 1.5rem;
  transition: var(--transition);

  .chart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color-subtle);
  }

  h4 {
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--text-color);
  }

  .toggle-btn {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    color: var(--primary-600);
    padding: 0.4rem 0.9rem;
    border-radius: var(--border-radius-pill);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .dark-theme .toggle-btn {
    color: var(--primary-400);
  }

  .toggle-btn:hover {
    background: var(--primary-500);
    color: var(--white);
    border-color: var(--primary-500);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  }
`;

export default Wrapper;
