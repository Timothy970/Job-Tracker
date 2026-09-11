import styled from 'styled-components';

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
              var(--background-color);

  .error-card {
    max-width: 580px;
    width: 100%;
    padding: 2.5rem 2rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-3);
  }

  img {
    width: 85%;
    max-width: 380px;
    display: block;
    margin: 0 auto 2rem;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }
  p {
    line-height: 1.6;
    margin-bottom: 1.75rem;
    color: var(--text-secondary-color);
    font-size: 0.95rem;
  }
  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.65rem 1.5rem;
  }
`;

export default Wrapper;
