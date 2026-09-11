import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .admin-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .admin-title-group h3 {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--text-color);
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .admin-title-group p {
    font-size: 0.875rem;
    color: var(--text-secondary-color);
    margin-top: 0.25rem;
  }

  .admin-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .print-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--background-secondary-color);
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.45rem 1rem;
    border-radius: var(--border-radius-sm);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
  }

  .print-btn:hover {
    border-color: var(--primary-500);
    color: var(--primary-600);
    transform: translateY(-1px);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 992px) {
    .charts-grid {
      grid-template-columns: 1.2fr 0.8fr;
    }
  }

  .admin-card {
    background: var(--background-secondary-color);
    border-radius: var(--border-radius-lg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-2);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid var(--border-color-subtle);
  }

  .card-header h4 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .insights-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .insights-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1200px) {
    .insights-grid {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  .rank-list {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .rank-item {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .rank-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.875rem;
  }

  .rank-name {
    font-weight: 600;
    color: var(--text-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .rank-badge {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.12);
    color: var(--primary-600);
    font-size: 0.75rem;
    font-weight: 700;
    display: grid;
    place-items: center;
  }

  .rank-count {
    font-weight: 700;
    color: var(--text-secondary-color);
  }

  .progress-bar {
    width: 100%;
    height: 6px;
    background: var(--input-bg);
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 9999px;
    transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .table-responsive {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.875rem;
  }

  th {
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: 700;
    color: var(--text-secondary-color);
    letter-spacing: 0.04em;
    border-bottom: 1px solid var(--border-color);
  }

  td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--border-color-subtle);
    color: var(--text-color);
    vertical-align: middle;
  }

  tr:hover td {
    background: rgba(59, 130, 246, 0.03);
  }

  .dark-theme tr:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .user-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .avatar-sm {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--primary-100);
    color: var(--primary-600);
    display: grid;
    place-items: center;
    font-weight: 700;
    font-size: 0.85rem;
  }

  .role-badge {
    padding: 0.2rem 0.6rem;
    border-radius: var(--border-radius-pill);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    display: inline-block;
  }

  .role-admin {
    background: rgba(139, 92, 246, 0.15);
    color: #8b5cf6;
    border: 1px solid rgba(139, 92, 246, 0.25);
  }

  .role-user {
    background: rgba(59, 130, 246, 0.12);
    color: var(--primary-600);
    border: 1px solid rgba(59, 130, 246, 0.25);
  }

  .dark-theme .role-user {
    color: var(--primary-400);
  }

  .empty-msg {
    text-align: center;
    padding: 2rem 0;
    color: var(--text-secondary-color);
    font-size: 0.9rem;
  }
`;

export default Wrapper;
