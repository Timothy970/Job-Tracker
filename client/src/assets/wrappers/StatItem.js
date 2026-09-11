import styled from 'styled-components';

const Wrapper = styled.article`
  padding: 1.75rem 2rem;
  background: var(--background-secondary-color);
  border: 1px solid var(--border-color);
  border-bottom: 4px solid ${(props) => props.color};
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-card);
  transition: var(--transition);

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-card-hover);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 800;
    font-size: 2.75rem;
    color: ${(props) => props.color};
    line-height: 1.1;
    letter-spacing: -0.03em;
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    font-weight: 600;
    letter-spacing: 0;
    text-align: left;
    margin-top: 1rem;
    font-size: 1rem;
    color: var(--text-secondary-color);
  }
  .icon {
    width: 54px;
    height: 54px;
    background: ${(props) => props.bcg};
    border-radius: var(--border-radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
    svg {
      font-size: 1.6rem;
      color: ${(props) => props.color};
    }
  }

  @media (max-width: 576px) {
    padding: 1.25rem 1.5rem;
    .count {
      font-size: 2.25rem;
    }
    .icon {
      width: 46px;
      height: 46px;
      svg {
        font-size: 1.35rem;
      }
    }
  }
`;

export default Wrapper;
