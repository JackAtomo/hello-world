import React from 'react';
import { useMatchMedia } from '../shared/hooks/useMatchMedia';
import { useLocation } from 'react-router';

function Header({ title, user, tag, onToggleMenu, onLogout }) {
  const isMobile = useMatchMedia('(max-width: 576px)');
  const location = useLocation();

  return (
    <header class="header">
      {!isMobile && <h1>{title}</h1>}
      {isMobile && location.pathname === '/' && (
        <React.Fragment>
          <div class="header-item" onClick={onToggleMenu}>
            <NavLink />
          </div>
          <div class="header-item centered">
            <h2 class="header-tag">{tag}</h2>
          </div>
        </React.Fragment>
      )}

      {user && (
        <div class="header-item right">
          <div>
            {!isMobile && <p class="header-name">Hola {user.name}</p>}
            <a
              href="/"
              onClick={e => {
                e.preventDefault();
                onLogout();
              }}
            >
              Salir
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink() {
  return (
    <a href="#tags" id="tags-toggle">
      <svg
        width="16"
        height="13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke="#C86818"
          stroke-width="3"
          d="M0 1.5h16M0 6.5h16M0 11.5h16"
        />
      </svg>
    </a>
  );
}
export { Header };
