import { useDashboardContext } from '../pages/DashboardLayout';
import { linkGroups } from '../utils/links';
import { NavLink } from 'react-router-dom';

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const { role } = user || {};

  return (
    <div className='nav-groups'>
      {linkGroups.map((group) => {
        const { category, items, icon: GroupIcon, module } = group;

        const visibleItems = items.filter(
          (item) => !(item.path === 'admin' && role !== 'admin')
        );
        if (visibleItems.length === 0) return null;

        const groupClass = module ? 'nav-group nav-group-' + module : 'nav-group';

        return (
          <div key={category} className={groupClass}>
            {category !== 'Overview' && (
              <div className='nav-group-header'>
                {GroupIcon && <span className='group-icon'>{GroupIcon}</span>}
                <span className='nav-group-title'>{category}</span>
              </div>
            )}
            <div className='nav-links'>
              {visibleItems.map((link) => {
                const { text, path, icon, module: itemModule } = link;
                return (
                  <NavLink
                    to={path}
                    key={text}
                    className={({ isActive }) => {
                      const moduleClass = itemModule ? 'nav-link-' + itemModule : '';
                      const activeClass = isActive ? 'active' : '';
                      return ['nav-link', moduleClass, activeClass]
                        .filter(Boolean)
                        .join(' ');
                    }}
                    onClick={isBigSidebar ? null : toggleSidebar}
                    end
                  >
                    <span className='icon'>{icon}</span>
                    <span className='link-text'>{text}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NavLinks;
