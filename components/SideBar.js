import React from "react";
import "../styles/styles.sass";

const SideBar = () => {
  return (
    <div>
      <aside className='menu is-hidden-mobile'>
        <p className='menu-label'>Tablas</p>
        <ul className='menu-list'>
          <li>
            <a href='/articles'>Articulos</a>
          </li>
          <li>
            <a href='/albums'>Albumes</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
