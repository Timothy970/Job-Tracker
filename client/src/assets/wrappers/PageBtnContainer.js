import styled from 'styled-components';

const Wrapper = styled.section`
  height: 5rem;
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.75rem;

  .btn-container {
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-1);
    display: flex;
    overflow: hidden;
  }
  .page-btn {
    background: transparent;
    border: none;
    width: 42px;
    height: 38px;
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--text-color);
    border-radius: 0;
    cursor: pointer;
    box-shadow: none;
    transition: var(--transition);
    display: grid;
    place-items: center;
  }
  .page-btn:hover {
    background: rgba(59, 130, 246, 0.1);
    color: var(--primary-600);
    transform: none;
  }
  .active {
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-600) 100%);
    color: var(--white);
    font-weight: 700;
  }
  .active:hover {
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-700) 100%);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    box-shadow: var(--shadow-1);
    padding: 0 1rem;
    height: 38px;
    color: var(--text-color);
    text-transform: capitalize;
    font-weight: 600;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
    border-color: var(--primary-500);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    transform: translateY(-1px);
  }
  .dots {
    display: grid;
    place-items: center;
    cursor: default;
    color: var(--text-secondary-color);
  }
  .dots:hover {
    background: transparent;
    color: var(--text-secondary-color);
  }

  @media (max-width: 576px) {
    justify-content: center;
    height: auto;
    padding: 1rem 0;
    .prev-btn,
    .next-btn {
      padding: 0 0.6rem;
      font-size: 0.8rem;
    }
    .page-btn {
      width: 36px;
      height: 36px;
      font-size: 0.85rem;
    }
  }
`;
export default Wrapper;
