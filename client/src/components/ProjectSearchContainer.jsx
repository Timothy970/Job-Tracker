import styled from 'styled-components';
import { Form, useSubmit, Link } from 'react-router-dom';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { useAllProjectsContext } from '../pages/AllProjects';
import { FiRotateCcw, FiFilter } from 'react-icons/fi';

const ProjectSearchContainer = () => {
  const { searchValues } = useAllProjectsContext();
  const {
    search = '',
    projectType = 'all',
    projectStatus = 'all',
    componentType = 'all',
    deploymentStatus = 'all',
    sort = 'newest',
  } = searchValues;

  const submit = useSubmit();

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.form;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 500);
    };
  };

  const projectTypeOptions = [
    'all',
    'monolithic',
    'be_fe',
    'mobile',
    'be_fe_mobile',
    'be_mobile',
    'fe_mobile',
    'microservice',
    'sdk',
    'other',
  ];

  const projectStatusOptions = [
    'all',
    'planning',
    'in-progress',
    'completed',
    'maintained',
    'archived',
  ];

  const componentTypeOptions = [
    'all',
    'app',
    'backend',
    'frontend',
    'mobile',
    'service',
    'sdk',
    'other',
  ];

  const deploymentStatusOptions = ['all', 'deployed', 'not-deployed'];

  const sortOptions = [
    'newest',
    'oldest',
    'a-z',
    'z-a',
    'recently-updated',
  ];

  return (
    <Wrapper>
      <Form className='form'>
        <div className='filter-header'>
          <div className='title-group'>
            <FiFilter className='filter-icon' />
            <h5>Filter Projects</h5>
          </div>
          <Link
            to='/dashboard/all-projects'
            className='btn reset-btn'
            title='Reset Filters'
          >
            <FiRotateCcw />
            <span>Reset</span>
          </Link>
        </div>

        <div className='filter-grid'>
          <FormRow
            type='search'
            name='search'
            labelText='Search'
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />

          <FormRowSelect
            labelText='Project Type'
            name='projectType'
            list={projectTypeOptions}
            defaultValue={projectType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText='Project Status'
            name='projectStatus'
            list={projectStatusOptions}
            defaultValue={projectStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText='Component'
            name='componentType'
            list={componentTypeOptions}
            defaultValue={componentType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText='Deployment'
            name='deploymentStatus'
            list={deploymentStatusOptions}
            defaultValue={deploymentStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />

          <FormRowSelect
            labelText='Sort By'
            name='sort'
            list={sortOptions}
            defaultValue={sort}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
        </div>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  background: var(--background-secondary-color);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-1);
  padding: 0.85rem 1.15rem;
  margin-bottom: 1.5rem;
  transition: var(--transition);

  .form {
    margin: 0;
    padding: 0;
    box-shadow: none;
    background: transparent;
    width: 100%;
    max-width: 100%;
    border: none;
  }

  .filter-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border-color-subtle);
  }

  .title-group {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-color);

    h5 {
      font-size: 0.95rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin: 0;
    }

    .filter-icon {
      color: var(--primary-500);
      font-size: 1.1rem;
    }
  }

  .reset-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--grey-600);
    background: var(--grey-100);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    transition: var(--transition-fast);
    text-decoration: none;
    line-height: 1;

    svg {
      font-size: 0.9rem;
      transition: transform 0.25s ease;
    }

    &:hover {
      background: var(--primary-50);
      color: var(--primary-600);
      border-color: var(--primary-200);

      svg {
        transform: rotate(-90deg);
      }
    }
  }

  .dark-theme & .reset-btn {
    background: rgba(255, 255, 255, 0.05);
    color: var(--grey-300);
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(59, 130, 246, 0.15);
      color: var(--primary-400);
      border-color: rgba(59, 130, 246, 0.3);
    }
  }

  .filter-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    align-items: end;

    @media (min-width: 576px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 868px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 1200px) {
      grid-template-columns: 1.4fr repeat(5, 1fr);
    }
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-label {
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    color: var(--text-secondary-color);
    text-transform: capitalize;
  }

  .form-input,
  .form-select {
    height: 38px;
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    border-radius: var(--border-radius-sm);
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    transition: var(--transition-fast);

    &:focus {
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
    }
  }
`;

export default ProjectSearchContainer;
