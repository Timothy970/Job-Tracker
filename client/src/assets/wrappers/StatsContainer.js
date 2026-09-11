import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  row-gap: 1.25rem;
  column-gap: 1.25rem;
  grid-template-columns: 1fr;

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1120px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export default Wrapper;
