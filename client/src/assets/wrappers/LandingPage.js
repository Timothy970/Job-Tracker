import styled from 'styled-components';

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.06) 0%, transparent 45%),
              radial-gradient(circle at 90% 80%, rgba(37, 99, 235, 0.05) 0%, transparent 45%),
              var(--background-color);
  overflow-x: hidden;

  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    min-height: 4.75rem;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .logo {
    width: 140px;
    max-width: 100%;
    height: auto;
    max-height: 44px;
    object-fit: contain;
  }

  .nav-cta {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .nav-cta .btn {
    padding: 0.45rem 0.95rem;
    font-size: 0.85rem;
  }

  .page {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    row-gap: 2.5rem;
    padding: 1.5rem 0 3.5rem;
  }

  .info {
    max-width: 100%;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.35rem 0.85rem;
    background: rgba(59, 130, 246, 0.1);
    color: var(--primary-600);
    border: 1px solid rgba(59, 130, 246, 0.2);
    border-radius: var(--border-radius-pill);
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1.25rem;
    letter-spacing: 0.01em;
  }

  .dark-theme .badge {
    background: rgba(59, 130, 246, 0.18);
    color: var(--primary-300);
    border-color: rgba(59, 130, 246, 0.3);
  }

  h1 {
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 1.25rem;
    font-size: clamp(2rem, 5.5vw, 3.5rem);
    letter-spacing: -0.03em;
    span {
      background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-400) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    line-height: 1.65;
    color: var(--text-secondary-color);
    margin-bottom: 2rem;
    max-width: 36em;
    font-size: clamp(0.95rem, 1.8vw, 1.05rem);
  }

  .cta-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2.25rem;
  }

  .register-btn {
    padding: 0.65rem 1.5rem;
    font-size: 0.95rem;
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.3);
  }

  .login-btn {
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
  }

  .feature-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--border-color-subtle);
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--text-secondary-color);
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    padding: 0.35rem 0.75rem;
    border-radius: var(--border-radius-pill);
    box-shadow: var(--shadow-1);
    white-space: nowrap;
  }

  .main-img-wrapper {
    display: none;
    position: relative;
    max-width: 480px;
    margin: 0 auto;
  }

  .main-img {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 15px 30px rgba(15, 23, 42, 0.12));
    transition: transform 0.4s ease;
  }

  .main-img:hover {
    transform: translateY(-4px);
  }

  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1.15fr 0.85fr;
      column-gap: 3.5rem;
      row-gap: 0;
    }
    .main-img-wrapper {
      display: block;
    }
  }

  @media (max-width: 480px) {
    nav {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.75rem;
    }
    .nav-cta {
      width: 100%;
      justify-content: flex-start;
    }
    .cta-group {
      flex-direction: column;
    }
    .cta-group .btn {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default Wrapper;
