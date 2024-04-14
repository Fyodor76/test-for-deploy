import './index.scss';
import { FC } from 'react';

import { MENU } from '../../const/menu.ts';


interface SidebarType {
    isOpen: boolean
}
export const Sidebar: FC<SidebarType> = ({ isOpen }) => {
  const sidebarStyle = {
    transition: 'left 300ms ease-in-out',
    left: isOpen ? 0 : -320,  // 320 - ширина sidebar
  };

  return (
    <div
      className="sidebar"
      style={{ ...sidebarStyle }}
    >
      <div className="sidebar__container">
        {MENU.map((menuItem) => (
          <div key={menuItem.title} className="sidebar__container__elements">
            <a href={menuItem.link}>{menuItem.title}</a>
          </div>
        ))}
      </div>
    </div>
  );
};
