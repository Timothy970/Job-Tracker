import React from 'react';
import styled from 'styled-components';
import ProjectCard from './ProjectCard';
import PageBtnContainer from './PageBtnContainer';
import { useAllProjectsContext } from '../pages/AllProjects';
import {
  FaFileCsv,
  FaFileCode,
  FaMarkdown,
  FaDownload,
  FaFolderOpen,
  FaFolderPlus,
  FaUndo,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProjectsContainer = () => {
  const { data, queryClient, searchValues } = useAllProjectsContext();
  const { projects = [], totalProjects = 0, numOfPages = 1 } = data || {};

  const handleExport = (format) => {
    const params = new URLSearchParams();
    if (searchValues.search) params.append('search', searchValues.search);
    if (searchValues.projectType && searchValues.projectType !== 'all')
      params.append('projectType', searchValues.projectType);
    if (searchValues.projectStatus && searchValues.projectStatus !== 'all')
      params.append('projectStatus', searchValues.projectStatus);
    if (searchValues.componentType && searchValues.componentType !== 'all')
      params.append('componentType', searchValues.componentType);
    if (searchValues.deploymentStatus && searchValues.deploymentStatus !== 'all')
      params.append('deploymentStatus', searchValues.deploymentStatus);
    params.append('format', format);

    const downloadUrl = `/api/v1/projects/export?${params.toString()}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', `projects-export.${format === 'markdown' ? 'md' : format}`);
    link.click();
    link.remove();
  };

  if (projects.length === 0) {
    const hasFilters =
      searchValues.search ||
      (searchValues.projectType && searchValues.projectType !== 'all') ||
      (searchValues.projectStatus && searchValues.projectStatus !== 'all') ||
      (searchValues.componentType && searchValues.componentType !== 'all') ||
      (searchValues.deploymentStatus && searchValues.deploymentStatus !== 'all');

    return (
      <Wrapper>
        <div className='empty-state-card'>
          <div className='empty-icon-wrapper empty-icon-projects'>
            <FaFolderOpen />
          </div>
          <h3>No Projects Found</h3>
          <p>
            {hasFilters
              ? "We couldn't find any projects matching your search or filter criteria. Try clearing your filters or create a new project workspace."
              : 'You have not tracked any software projects yet. Create your first project to organize components, env variables, and tech stacks.'}
          </p>
          <div className='empty-actions'>
            <Link to='/dashboard/add-project' className='btn btn-primary-projects'>
              <FaFolderPlus /> Create Project
            </Link>
            {hasFilters && (
              <Link to='/dashboard/all-projects' className='btn btn-hipster'>
                <FaUndo /> Reset Filters
              </Link>
            )}
          </div>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="header-row">
        <h5>
          {totalProjects} Project{projects.length > 1 && 's'} Found
        </h5>
        <div className="export-group">
          <span className="export-label">
            <FaDownload /> Export:
          </span>
          <button
            type="button"
            className="btn-export"
            onClick={() => handleExport('csv')}
            title="Export CSV spreadsheet"
          >
            <FaFileCsv /> CSV
          </button>
          <button
            type="button"
            className="btn-export"
            onClick={() => handleExport('json')}
            title="Export full JSON structure"
          >
            <FaFileCode /> JSON
          </button>
          <button
            type="button"
            className="btn-export"
            onClick={() => handleExport('markdown')}
            title="Export formatted Markdown template"
          >
            <FaMarkdown /> Markdown Docs
          </button>
        </div>
      </div>

      <div className="projects-grid">
        {projects.map((project) => {
          return (
            <ProjectCard
              key={project._id}
              project={project}
              queryClient={queryClient}
            />
          );
        })}
      </div>

      {numOfPages > 1 && <PageBtnContainer numOfPages={numOfPages} />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h5 {
      font-weight: 700;
      margin: 0;
      font-size: 1.15rem;
    }
  }

  .export-label {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--grey-500);
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 1400px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;

export default ProjectsContainer;
