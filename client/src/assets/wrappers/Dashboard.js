import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    min-height: 100vh;
  }
  .dashboard-page {
    width: 92vw;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 2.25rem 0 4rem;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 92%;
    }
  }
`;
export default Wrapper;
