import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt, FaKey, FaEdit, FaTrash, FaCopy, FaServer } from 'react-icons/fa';
import { Link, Form, useNavigate } from 'react-router-dom';
import ProjectEnvModal from './ProjectEnvModal';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

const ProjectCard = ({ project, queryClient }) => {
  const [showEnvModal, setShowEnvModal] = useState(false);
  const navigate = useNavigate();

  const handleDuplicate = async () => {
    try {
      const duplicatedData = {
        title: `${project.title} (Copy)`,
        description: project.description,
        githubUrl: project.githubUrl,
        projectType: project.projectType,
        customProjectType: project.customProjectType || '',
        projectStatus: project.projectStatus,
        tags: project.tags,
        components: project.components.map((c) => ({
          name: c.name,
          componentType: c.componentType,
          languages: c.languages,
          deployedAt: c.deployedAt,
          envVariables: c.envVariables,
          isEnvShared: c.isEnvShared,
          envNote: c.envNote,
        })),
      };

      await customFetch.post('/projects', duplicatedData);
      toast.success('Project duplicated successfully!');
      if (queryClient) {
        queryClient.invalidateQueries(['projects']);
      } else {
        navigate(0);
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Failed to duplicate project');
    }
  };

  const getProjectTypeLabel = () => {
    if (project.projectType === 'other' && project.customProjectType) {
      return project.customProjectType;
    }
    switch (project.projectType) {
      case 'monolithic':
        return 'Monolithic';
      case 'be_fe':
        return 'BE & FE';
      case 'mobile':
        return 'Pure Mobile';
      case 'be_fe_mobile':
        return 'FE + BE + Mobile';
      case 'be_mobile':
        return 'BE + Mobile';
      case 'fe_mobile':
        return 'FE + Mobile';
      case 'microservice':
        return 'Microservice';
      case 'sdk':
        return 'SDK / Library';
      default:
        return 'Other';
    }
  };

  const getProjectTypeBadgeClass = () => {
    const type = project.projectType || '';
    if (type.includes('mobile')) return 'comp-badge-mobile';
    if (type === 'be_fe' || type === 'backend') return 'comp-badge-backend';
    if (type === 'monolithic') return 'comp-badge-monolith';
    if (type === 'microservice' || type === 'sdk') return 'comp-badge-service';
    return 'comp-badge-other';
  };

  const hasEnv = project.components?.some((c) => c.envVariables?.trim());


  return (
    <Wrapper>
      <header>
        <div className="main-icon">
          {project.title.charAt(0).toUpperCase()}
        </div>
        <div className="info">
          <h5>{project.title}</h5>
          <div className="badge-row">
            <span className={`comp-badge ${getProjectTypeBadgeClass()}`}>
              {getProjectTypeLabel()}
            </span>

            <span className={`status ${project.projectStatus || 'pending'}`}>
              {project.projectStatus || 'in-progress'}
            </span>

            {project.liveUrl || project.beLiveUrl ? (
              <a
                href={(project.liveUrl || project.beLiveUrl).startsWith('http') ? (project.liveUrl || project.beLiveUrl) : `https://${project.liveUrl || project.beLiveUrl}`}
                target="_blank"
                rel="noreferrer"
                className="status live-badge"
              >
                <FaExternalLinkAlt style={{ fontSize: '0.7rem' }} /> Hosted
              </a>
            ) : (
              <span className="status not-hosted-badge">Not Hosted</span>
            )}
          </div>
        </div>
      </header>

      <div className="content">
        {project.description && (
          <p className="description">{project.description}</p>
        )}

        <div className="links-row">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="github-link"
              title="GitHub Repository"
            >
              <FaGithub /> {project.githubUrl.replace(/^https?:\/\//, '')}
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl.startsWith('http') ? project.liveUrl : `https://${project.liveUrl}`}
              target="_blank"
              rel="noreferrer"
              className="github-link live-link"
              title="Frontend / Main Live App"
            >
              <FaExternalLinkAlt /> {project.liveUrl.replace(/^https?:\/\//, '')} (FE)
            </a>
          )}

          {project.beLiveUrl && (
            <a
              href={project.beLiveUrl.startsWith('http') ? project.beLiveUrl : `https://${project.beLiveUrl}`}
              target="_blank"
              rel="noreferrer"
              className="github-link be-link"
              title="Backend API Hosted"
            >
              <FaServer /> {project.beLiveUrl.replace(/^https?:\/\//, '')} (BE)
            </a>
          )}
        </div>

        {/* Components Breakdown */}
        {project.components && project.components.length > 0 && (
          <div className="components-list">
            <span className="section-label">Components & Stack:</span>
            <div className="components-grid">
              {project.components.map((comp, idx) => {
                const badgeClass = `comp-badge-${comp.componentType || 'other'}`;
                const isLive = comp.deployedAt && comp.deployedAt !== 'Not deployed yet' && comp.deployedAt !== 'not deployed yet';

                return (
                  <div key={comp._id || idx} className="comp-item">
                    <div className="comp-item-header">
                      <span className={`comp-badge ${badgeClass}`}>
                        {comp.name}
                      </span>
                      {isLive ? (
                        <a
                          href={comp.deployedAt.startsWith('http') ? comp.deployedAt : `https://${comp.deployedAt}`}
                          target="_blank"
                          rel="noreferrer"
                          className="deploy-tag live"
                        >
                          <FaExternalLinkAlt /> {comp.deployedAt}
                        </a>
                      ) : (
                        <span className="deploy-tag not-live">Not deployed yet</span>
                      )}
                    </div>
                    {comp.languages && (
                      <p className="comp-languages">{comp.languages}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <footer className="actions-footer">
          {hasEnv && (
            <button
              type="button"
              className="btn btn-env"
              onClick={() => setShowEnvModal(true)}
            >
              <FaKey /> .env ({project.components.filter(c => c.envVariables?.trim()).length})
            </button>
          )}

          <button
            type="button"
            className="btn btn-clone"
            title="Duplicate Project"
            onClick={handleDuplicate}
          >
            <FaCopy /> Duplicate
          </button>

          <Link to={`../edit-project/${project._id}`} className="btn edit-btn">
            <FaEdit /> Edit
          </Link>

          <Form method="post" action={`../delete-project/${project._id}`}>
            <button type="submit" className="btn delete-btn">
              <FaTrash /> Delete
            </button>
          </Form>
        </footer>
      </div>

      {showEnvModal && (
        <ProjectEnvModal
          project={project}
          onClose={() => setShowEnvModal(false)}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius-lg);
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-2);
  border: 1px solid var(--grey-100);
  transition: var(--transition);

  &:hover {
    box-shadow: var(--shadow-4);
    transform: translateY(-2px);
  }

  header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: 1.25rem;

    .main-icon {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      background: linear-gradient(135deg, var(--primary-500), var(--primary-700, #1d4ed8));
      border-radius: var(--border-radius-md);
      font-size: 1.4rem;
      font-weight: 700;
      text-transform: uppercase;
      color: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .info {
      h5 {
        margin: 0 0 0.4rem 0;
        font-size: 1.15rem;
        font-weight: 600;
        color: var(--text-color);
      }
      .badge-row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
      }
    }
  }

  .content {
    padding: 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 0.9rem;
  }

  .description {
    font-size: 0.88rem;
    color: var(--grey-600);
    line-height: 1.5;
    margin: 0;
  }

  .links-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .github-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: var(--primary-500);
    font-weight: 500;
    text-decoration: none;
    word-break: break-all;
    &:hover {
      text-decoration: underline;
    }

    &.live-link {
      color: #059669;
    }

    &.be-link {
      color: #8b5cf6;
    }
  }

  .live-badge {
    background: #dcfce7;
    color: #15803d;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  .not-hosted-badge {
    background: var(--grey-100);
    color: var(--grey-500);
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--grey-500);
    display: block;
    margin-bottom: 0.4rem;
  }

  .components-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .comp-item {
    background: rgba(0, 0, 0, 0.02);
    border: 1px solid var(--grey-100);
    border-radius: var(--border-radius-sm);
    padding: 0.6rem 0.75rem;
    font-size: 0.82rem;
  }

  .comp-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.25rem;
  }

  .deploy-tag {
    font-size: 0.75rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    text-decoration: none;

    &.live {
      color: #059669;
      font-weight: 500;
      &:hover {
        text-decoration: underline;
      }
    }
    &.not-live {
      color: var(--grey-400);
      font-style: italic;
    }
  }

  .comp-languages {
    color: var(--grey-600);
    margin: 0;
    font-size: 0.78rem;
  }

  .actions-footer {
    margin-top: auto;
    padding-top: 0.75rem;
    border-top: 1px solid var(--grey-100);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.8rem;
      padding: 0.35rem 0.75rem;
      height: 32px;
      border-radius: var(--border-radius-sm);
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
      transition: var(--transition);
    }

    .btn-env {
      background: rgba(var(--primary-500-raw, 43, 154, 243), 0.12);
      color: var(--primary-500);
      border: 1px solid var(--primary-500);
      &:hover {
        background: var(--primary-500);
        color: #fff;
      }
    }

    .btn-clone {
      background: var(--grey-100);
      color: var(--grey-700);
      border: 1px solid var(--grey-300);
      &:hover {
        background: var(--grey-200);
      }
    }

    .edit-btn {
      background: var(--green-light);
      color: var(--green-dark);
      border: 1px solid transparent;
      &:hover {
        background: #059669;
        color: #fff;
      }
    }

    .delete-btn {
      background: var(--red-light);
      color: var(--red-dark);
      border: 1px solid transparent;
      &:hover {
        background: var(--red-dark);
        color: #fff;
      }
    }
  }
`;

export default ProjectCard;
