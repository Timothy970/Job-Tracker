import styled from 'styled-components';

const Wrapper = styled.section`
  border-radius: var(--border-radius-lg);
  width: 100%;
  background: var(--background-secondary-color);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-2);
  padding: 2.25rem 2.25rem;
  transition: var(--transition);

  .form-title {
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color-subtle);
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--text-color);
    letter-spacing: -0.02em;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    border: none;
    background: transparent;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1.25rem;
    column-gap: 1.25rem;
  }
  .form-btn {
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
  }
  .reset-btn {
    align-self: end;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 42px;
    background: var(--grey-100);
    color: var(--grey-700);
    border: 1px solid var(--grey-300);
    box-shadow: none;
    font-weight: 600;
    border-radius: var(--border-radius-sm);
    transition: var(--transition);
  }
  .dark-theme .reset-btn {
    background: rgba(255, 255, 255, 0.06);
    color: var(--grey-300);
    border-color: rgba(255, 255, 255, 0.12);
  }
  .reset-btn:hover {
    background: var(--grey-200);
    color: var(--grey-900);
  }
  .dark-theme .reset-btn:hover {
    background: rgba(255, 255, 255, 0.12);
    color: var(--white);
  }
  @media (max-width: 576px) {
    padding: 1.5rem 1.25rem;
    .form-center {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: end;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default Wrapper;
