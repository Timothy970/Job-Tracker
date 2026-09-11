import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  .job-icon {
    font-size: 1rem;
    margin-right: 0.75rem;
    display: flex;
    align-items: center;
    color: var(--primary-500);
  }
  .job-text {
    text-transform: capitalize;
    color: var(--text-color);
    font-weight: 500;
  }
`;
export default Wrapper;
