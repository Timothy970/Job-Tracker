import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 3rem;
  
  h2 {
    text-transform: none;
    font-size: 1.5rem;
    color: var(--text-secondary-color);
    text-align: center;
    padding: 3rem 0;
  }
  
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    font-size: 1.1rem;
    letter-spacing: -0.01em;
  }

  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1.5rem;
  }

  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
  }
`;
export default Wrapper;
