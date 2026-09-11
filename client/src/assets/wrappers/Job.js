import styled from 'styled-components';

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--border-color);
  display: grid;
  grid-template-rows: auto 1fr;
  box-shadow: var(--shadow-card);
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
    border-color: rgba(59, 130, 246, 0.3);
  }

  header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-color-subtle);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1.25rem;
  }
  .main-icon {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    background: linear-gradient(135deg, var(--primary-500) 0%, var(--primary-700) 100%);
    border-radius: var(--border-radius-sm);
    font-size: 1.35rem;
    font-weight: 800;
    text-transform: uppercase;
    color: var(--white);
    box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
  }
  .info {
    h5 {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-color);
      margin-bottom: 0.2rem;
      letter-spacing: -0.01em;
    }
    p {
      margin: 0;
      text-transform: capitalize;
      font-size: 0.875rem;
      color: var(--text-secondary-color);
      font-weight: 500;
    }
  }
  .content {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    column-gap: 1rem;
    align-items: center;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
  }
  .actions {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color-subtle);
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .edit-btn,
  .delete-btn {
    height: 32px;
    font-size: 0.8125rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0 0.85rem;
    border-radius: var(--border-radius-sm);
  }
  .edit-btn {
    background: rgba(59, 130, 246, 0.1);
    color: var(--primary-600);
    border: 1px solid rgba(59, 130, 246, 0.25);
    box-shadow: none;
  }
  .dark-theme .edit-btn {
    background: rgba(59, 130, 246, 0.18);
    color: var(--primary-300);
    border-color: rgba(59, 130, 246, 0.35);
  }
  .edit-btn:hover {
    background: var(--primary-600);
    color: var(--white);
    border-color: var(--primary-600);
  }
  .delete-btn {
    background: rgba(220, 38, 38, 0.08);
    color: var(--red-dark);
    border: 1px solid rgba(220, 38, 38, 0.2);
    box-shadow: none;
  }
  .dark-theme .delete-btn {
    background: rgba(220, 38, 38, 0.15);
    color: #fca5a5;
    border-color: rgba(220, 38, 38, 0.3);
  }
  .delete-btn:hover {
    background: var(--red-dark);
    color: var(--white);
    border-color: var(--red-dark);
  }

  @media (max-width: 480px) {
    header {
      padding: 1rem 1.15rem;
      gap: 0.85rem;
    }
    .main-icon {
      width: 42px;
      height: 42px;
      font-size: 1.15rem;
    }
    .content {
      padding: 1rem 1.15rem;
    }
  }
`;

export default Wrapper;
