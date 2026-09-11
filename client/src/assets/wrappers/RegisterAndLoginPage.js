import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2.5rem 1rem;
  background: radial-gradient(circle at 50% 10%, rgba(59, 130, 246, 0.06) 0%, transparent 50%),
              var(--background-color);

  .form {
    max-width: 440px;
    width: 100%;
    border-top: 4px solid var(--primary-500);
    padding: 2.5rem 2.25rem;
    position: relative;
    box-shadow: var(--shadow-3);
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .logo {
    display: block;
    margin: 0 auto 0.75rem;
    width: 140px;
    max-height: 44px;
    object-fit: contain;
  }

  h4 {
    text-align: center;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.35rem;
    color: var(--text-color);
  }

  .subtitle {
    text-align: center;
    font-size: 0.875rem;
    color: var(--text-secondary-color);
    margin-bottom: 1.75rem;
  }

  .member-row {
    margin-top: 1.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--border-color);
    text-align: center;
    font-size: 0.9rem;
    color: var(--text-secondary-color);
  }

  .member-btn {
    color: var(--primary-600);
    font-weight: 600;
    margin-left: 0.35rem;
    transition: var(--transition);
  }

  .dark-theme .member-btn {
    color: var(--primary-400);
  }

  .member-btn:hover {
    text-decoration: underline;
    color: var(--primary-700);
  }
`;

export default Wrapper;
