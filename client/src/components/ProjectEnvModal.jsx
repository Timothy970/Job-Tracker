import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCopy, FaDownload, FaEye, FaEyeSlash, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProjectEnvModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showSecrets, setShowSecrets] = useState(false);

  if (!project?.components?.length) {
    return null;
  }

  const currentComponent = project.components[activeTab] || project.components[0];

  const handleCopyEnv = () => {
    if (!currentComponent.envVariables) {
      toast.info('No environment variables to copy');
      return;
    }
    navigator.clipboard.writeText(currentComponent.envVariables);
    toast.success(`${currentComponent.name} .env copied to clipboard!`);
  };

  const handleDownloadEnv = () => {
    const envData = currentComponent.envVariables || `# ${currentComponent.name} environment variables\n`;
    const blob = new Blob([envData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const sanitizedTitle = project.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const sanitizedComp = currentComponent.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    link.href = url;
    link.download = `${sanitizedTitle}-${sanitizedComp}.env`;
    document.body.appendChild(link);
    link.click();
    document.body.remove(link);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${sanitizedComp}.env!`);
  };

  const maskEnvContent = (text) => {
    if (!text) return '# No environment variables set';
    if (showSecrets) return text;

    return text
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (trimmed.startsWith('#') || !trimmed.includes('=')) {
          return line;
        }
        const eqIdx = line.indexOf('=');
        const key = line.slice(0, eqIdx);
        const val = line.slice(eqIdx + 1);
        if (!val.trim()) return line;
        return `${key}=••••••••••••••••`;
      })
      .join('\n');
  };

  return (
    <Wrapper onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-content">
        <div className="modal-header">
          <div>
            <h3>{project.title} &mdash; Environment Variables</h3>
            <p className="subtitle">
              Component-specific configuration & secrets
            </p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Component Tabs */}
        <div className="tabs-bar">
          {project.components.map((comp, idx) => {
            const badgeClass = `comp-badge-${comp.componentType || 'other'}`;
            return (
              <button
                key={comp._id || idx}
                className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
                onClick={() => setActiveTab(idx)}
              >
                <span className={`comp-badge ${badgeClass}`}>{comp.name}</span>
                {comp.isEnvShared && (
                  <span className="shared-pill">Shared</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Component Details Banner */}
        <div className="component-info-banner">
          <div>
            <strong>Tech Stack:</strong> {currentComponent.languages || 'N/A'}
          </div>
          <div>
            <strong>Deployment:</strong> {currentComponent.deployedAt || 'Not deployed yet'}
          </div>
          {currentComponent.isEnvShared && currentComponent.envNote && (
            <div className="env-note">
              <em>Note:</em> {currentComponent.envNote}
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className="env-toolbar">
          <button
            type="button"
            className="btn-export"
            onClick={() => setShowSecrets(!showSecrets)}
          >
            {showSecrets ? <FaEyeSlash /> : <FaEye />}
            {showSecrets ? 'Mask Secrets' : 'Reveal Secrets'}
          </button>
          <button
            type="button"
            className="btn-export"
            onClick={handleCopyEnv}
          >
            <FaCopy /> Copy .env
          </button>
          <button
            type="button"
            className="btn-export"
            onClick={handleDownloadEnv}
          >
            <FaDownload /> Download File
          </button>
        </div>

        {/* Code Box */}
        <div className="env-code-box">
          <pre>{maskEnvContent(currentComponent.envVariables)}</pre>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem;

  .modal-content {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius-lg);
    width: 100%;
    max-width: 750px;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
    padding: 1.75rem;
    box-shadow: var(--shadow-4);
    border: 1px solid var(--grey-200);
    overflow: hidden;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.25rem;
      margin: 0;
      color: var(--text-color);
    }
    .subtitle {
      font-size: 0.85rem;
      color: var(--grey-500);
      margin: 0.25rem 0 0;
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    font-size: 1.25rem;
    color: var(--grey-500);
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      color: var(--red-dark);
    }
  }

  .tabs-bar {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--grey-200);
  }

  .tab-btn {
    background: transparent;
    border: 1px solid transparent;
    padding: 0.35rem 0.65rem;
    border-radius: var(--border-radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    transition: var(--transition);

    &.active {
      background: rgba(var(--primary-500-raw, 43, 154, 243), 0.1);
      border-color: var(--primary-500);
    }
  }

  .shared-pill {
    font-size: 0.7rem;
    background: var(--grey-200);
    color: var(--grey-700);
    padding: 0.1rem 0.4rem;
    border-radius: 4px;
  }

  .component-info-banner {
    background: rgba(0, 0, 0, 0.03);
    padding: 0.75rem;
    border-radius: var(--border-radius-sm);
    font-size: 0.85rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .env-code-box {
    flex: 1;
    min-height: 200px;
    max-height: 350px;
    overflow-y: auto;
  }
`;

export default ProjectEnvModal;
