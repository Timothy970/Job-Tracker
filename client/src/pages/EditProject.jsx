import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { FaPlus, FaTrash } from 'react-icons/fa';

const singleProjectQuery = (projectId) => {
  return {
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data } = await customFetch.get(`/projects/${projectId}`);
      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ params }) => {
    try {
      await queryClient.ensureQueryData(singleProjectQuery(params.id));
      return params.id;
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Project not found');
      return null;
    }
  };

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery(singleProjectQuery(id));
  const project = data?.project;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [projectData, setProjectData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    githubUrl: project?.githubUrl || '',
    liveUrl: project?.liveUrl || '',
    beLiveUrl: project?.beLiveUrl || '',
    projectType: project?.projectType || 'be_fe',
    customProjectType: project?.customProjectType || '',
    projectStatus: project?.projectStatus || 'in-progress',
    tags: project?.tags ? project.tags.join(', ') : '',
  });

  const [components, setComponents] = useState(
    project?.components || [
      {
        name: 'Backend',
        componentType: 'backend',
        languages: '',
        deployedAt: 'Not deployed yet',
        envVariables: '',
        isEnvShared: false,
        envNote: '',
      },
    ]
  );

  const handleAddComponent = () => {
    setComponents((prev) => [
      ...prev,
      {
        _id: `new-${Date.now()}-${prev.length}`,
        name: `Component ${prev.length + 1}`,
        componentType: 'other',
        languages: '',
        deployedAt: 'Not deployed yet',
        envVariables: '',
        isEnvShared: false,
        envNote: '',
      },
    ]);
  };

  const handleRemoveComponent = (index) => {
    if (components.length <= 1) {
      toast.warning('A project must have at least one component');
      return;
    }
    setComponents((prev) => prev.filter((_, i) => i !== index));
  };

  const handleComponentChange = (index, field, value) => {
    setComponents((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectData.title.trim()) {
      toast.error('Project title is required');
      return;
    }
    if (projectData.projectType === 'other' && !projectData.customProjectType.trim()) {
      toast.error('Please specify the custom project type');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: projectData.title,
        description: projectData.description,
        githubUrl: projectData.githubUrl,
        liveUrl: projectData.liveUrl,
        beLiveUrl: projectData.beLiveUrl,
        projectType: projectData.projectType,
        customProjectType: projectData.customProjectType,
        projectStatus: projectData.projectStatus,
        tags: projectData.tags
          ? projectData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : [],
        components: components.map((c) => ({
          name: c.name || 'Component',
          componentType: c.componentType || 'other',
          languages: c.languages || '',
          deployedAt: c.deployedAt || 'Not deployed yet',
          envVariables: c.envVariables || '',
          isEnvShared: !!c.isEnvShared,
          envNote: c.envNote || '',
        })),
      };

      await customFetch.patch(`/projects/${id}`, payload);
      queryClient.invalidateQueries(['projects']);
      queryClient.invalidateQueries(['project', id]);
      toast.success('Project updated successfully!');
      navigate('/dashboard/all-projects');
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'Failed to update project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h4 className="form-title">Edit Project &mdash; {project?.title}</h4>

        <div className="form-center">
          <div className="form-row">
            <label htmlFor="edit-title" className="form-label">
              Project Title *
            </label>
            <input
              type="text"
              id="edit-title"
              name="title"
              className="form-input"
              value={projectData.title}
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="edit-githubUrl" className="form-label">
              GitHub Repository URL
            </label>
            <input
              type="url"
              id="edit-githubUrl"
              name="githubUrl"
              className="form-input"
              value={projectData.githubUrl}
              onChange={(e) =>
                setProjectData({ ...projectData, githubUrl: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <label htmlFor="edit-liveUrl" className="form-label">
              Frontend / Main Hosted URL
            </label>
            <input
              type="url"
              id="edit-liveUrl"
              name="liveUrl"
              className="form-input"
              placeholder="https://my-app.vercel.app"
              value={projectData.liveUrl}
              onChange={(e) =>
                setProjectData({ ...projectData, liveUrl: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <label htmlFor="edit-beLiveUrl" className="form-label">
              Backend / API Hosted URL (Optional)
            </label>
            <input
              type="url"
              id="edit-beLiveUrl"
              name="beLiveUrl"
              className="form-input"
              placeholder="https://api.render.com"
              value={projectData.beLiveUrl}
              onChange={(e) =>
                setProjectData({ ...projectData, beLiveUrl: e.target.value })
              }
            />
          </div>

          <div className="form-row">
            <label htmlFor="edit-projectType" className="form-label">
              Project Type
            </label>
            <select
              id="edit-projectType"
              name="projectType"
              className="form-select"
              value={projectData.projectType}
              onChange={(e) =>
                setProjectData({ ...projectData, projectType: e.target.value })
              }
            >
              <option value="monolithic">Monolithic</option>
              <option value="be_fe">BE & FE</option>
              <option value="mobile">Pure Mobile</option>
              <option value="be_fe_mobile">FE + BE + Mobile</option>
              <option value="be_mobile">BE + Mobile</option>
              <option value="fe_mobile">FE + Mobile</option>
              <option value="microservice">Microservice</option>
              <option value="sdk">SDK</option>
              <option value="other">Other (Custom)</option>
            </select>
          </div>

          {projectData.projectType === 'other' && (
            <div className="form-row">
              <label htmlFor="edit-customProjectType" className="form-label">
                Specify Custom Project Type *
              </label>
              <input
                type="text"
                id="edit-customProjectType"
                name="customProjectType"
                className="form-input"
                placeholder="e.g. CLI Tool, Browser Extension, Discord Bot"
                value={projectData.customProjectType}
                onChange={(e) =>
                  setProjectData({
                    ...projectData,
                    customProjectType: e.target.value,
                  })
                }
                required
              />
            </div>
          )}

          <div className="form-row">
            <label htmlFor="edit-projectStatus" className="form-label">
              Project Status
            </label>
            <select
              id="edit-projectStatus"
              name="projectStatus"
              className="form-select"
              value={projectData.projectStatus}
              onChange={(e) =>
                setProjectData({ ...projectData, projectStatus: e.target.value })
              }
            >
              <option value="in-progress">In Progress</option>
              <option value="planning">Planning</option>
              <option value="completed">Completed</option>
              <option value="maintained">Maintained</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="form-row full-width">
            <label htmlFor="edit-description" className="form-label">
              Project Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              className="form-input form-textarea"
              value={projectData.description}
              onChange={(e) =>
                setProjectData({ ...projectData, description: e.target.value })
              }
            />
          </div>
        </div>

        {/* Components Section */}
        <div className="components-builder-section">
          <div className="builder-header">
            <div>
              <h5>Architecture Components & Environments</h5>
              <p className="builder-subtitle">
                Configure component languages, live deployments, and independent/shared .env blocks
              </p>
            </div>
            <button
              type="button"
              className="btn btn-add-comp"
              onClick={handleAddComponent}
            >
              <FaPlus /> Add Component Block
            </button>
          </div>

          {components.map((comp, idx) => {
            const badgeClass = `comp-badge-${comp.componentType || 'other'}`;
            const compKey = comp._id || comp.id || `edit-comp-${idx}`;

            return (
              <div key={compKey} className="component-card">
                <div className="component-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className={`comp-badge ${badgeClass}`}>
                      {comp.componentType.toUpperCase()}
                    </span>
                    <strong style={{ fontSize: '1.05rem' }}>
                      {comp.name || `Component #${idx + 1}`}
                    </strong>
                  </div>
                  {components.length > 1 && (
                    <button
                      type="button"
                      className="btn delete-btn"
                      onClick={() => handleRemoveComponent(idx)}
                    >
                      <FaTrash /> Remove
                    </button>
                  )}
                </div>

                <div className="component-grid">
                  <div className="form-row">
                    <label htmlFor={`edit-comp-name-${idx}`} className="form-label">
                      Component Name *
                    </label>
                    <input
                      type="text"
                      id={`edit-comp-name-${idx}`}
                      className="form-input"
                      value={comp.name}
                      onChange={(e) =>
                        handleComponentChange(idx, 'name', e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor={`edit-comp-type-${idx}`} className="form-label">
                      Component Type
                    </label>
                    <select
                      id={`edit-comp-type-${idx}`}
                      className="form-select"
                      value={comp.componentType}
                      onChange={(e) =>
                        handleComponentChange(idx, 'componentType', e.target.value)
                      }
                    >
                      <option value="backend">Backend</option>
                      <option value="frontend">Frontend</option>
                      <option value="mobile">Mobile</option>
                      <option value="app">App (Monolithic)</option>
                      <option value="service">Service</option>
                      <option value="sdk">SDK</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label htmlFor={`edit-comp-lang-${idx}`} className="form-label">
                      Languages / Tech Stack
                    </label>
                    <input
                      type="text"
                      id={`edit-comp-lang-${idx}`}
                      className="form-input"
                      value={comp.languages}
                      onChange={(e) =>
                        handleComponentChange(idx, 'languages', e.target.value)
                      }
                    />
                  </div>

                  <div className="form-row">
                    <label htmlFor={`edit-comp-deploy-${idx}`} className="form-label">
                      Deployed at / Live Link
                    </label>
                    <input
                      type="text"
                      id={`edit-comp-deploy-${idx}`}
                      className="form-input"
                      value={comp.deployedAt}
                      onChange={(e) =>
                        handleComponentChange(idx, 'deployedAt', e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* ENV Variables Block */}
                <div className="env-section">
                  <div className="env-header-controls">
                    <label htmlFor={`edit-comp-env-${idx}`} className="form-label">
                      Environment Variables (.env block)
                    </label>
                    <label className="checkbox-label" htmlFor={`edit-comp-shared-${idx}`}>
                      <input
                        type="checkbox"
                        id={`edit-comp-shared-${idx}`}
                        checked={comp.isEnvShared}
                        onChange={(e) =>
                          handleComponentChange(idx, 'isEnvShared', e.target.checked)
                        }
                      />
                      <span>Shared .env / Consumes other API</span>
                    </label>
                  </div>

                  {comp.isEnvShared && (
                    <input
                      type="text"
                      className="form-input shared-note-input"
                      placeholder="e.g. # Frontend consumes BE API, or shares .env with Backend"
                      value={comp.envNote}
                      onChange={(e) =>
                        handleComponentChange(idx, 'envNote', e.target.value)
                      }
                    />
                  )}

                  <textarea
                    id={`edit-comp-env-${idx}`}
                    className="form-input env-textarea"
                    placeholder="DATABASE_URL=postgres://...\nJWT_SECRET=...\nPORT=8080"
                    value={comp.envVariables}
                    onChange={(e) =>
                      handleComponentChange(idx, 'envVariables', e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="submit-row">
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating Project...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  border-radius: var(--border-radius-lg);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 2.5rem 3rem;
  box-shadow: var(--shadow-2);

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-title {
    margin-bottom: 1.75rem;
    font-size: 1.4rem;
    font-weight: 700;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .full-width {
    grid-column: 1 / -1;
  }

  .components-builder-section {
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 2px dashed var(--grey-200);
  }

  .builder-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;

    h5 {
      margin: 0 0 0.25rem 0;
      font-size: 1.15rem;
      font-weight: 700;
    }
    .builder-subtitle {
      font-size: 0.85rem;
      color: var(--grey-500);
      margin: 0;
    }
  }

  .btn-add-comp {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--primary-500);
    color: #fff;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border-radius: var(--border-radius-sm);
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: var(--transition);

    &:hover {
      background: var(--primary-700, #1d4ed8);
    }
  }

  .component-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .env-section {
    margin-top: 1rem;
  }

  .env-header-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .checkbox-label {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.82rem;
    color: var(--grey-600);
    cursor: pointer;

    input {
      cursor: pointer;
    }
  }

  .shared-note-input {
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    color: var(--primary-500);
    background: rgba(var(--primary-500-raw, 43, 154, 243), 0.05);
  }

  .env-textarea {
    height: 6.5rem;
    font-family: 'JetBrains Mono', Consolas, Monaco, monospace;
    font-size: 0.85rem;
    background: #0f172a;
    color: #38bdf8;
    border: 1px solid #1e293b;
    border-radius: var(--border-radius-sm);
    resize: vertical;
  }

  .submit-row {
    margin-top: 2rem;
  }
`;

export default EditProject;
