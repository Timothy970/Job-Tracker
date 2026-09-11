import styled from 'styled-components';

const Wrapper = styled.button`
  background: var(--background-secondary-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-pill);
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: var(--shadow-1);
  transition: var(--transition);

  .sun-icon {
    font-size: 1.15rem;
    color: #f59e0b;
    filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.4));
    transition: transform 0.3s ease;
  }
  .moon-icon {
    font-size: 1.1rem;
    color: #3b82f6;
    transition: transform 0.3s ease;
  }

  &:hover {
    border-color: var(--primary-400);
    transform: translateY(-1px);
    box-shadow: var(--shadow-2);
  }

  &:hover .sun-icon,
  &:hover .moon-icon {
    transform: rotate(15deg) scale(1.1);
  }
`;
export default Wrapper;
