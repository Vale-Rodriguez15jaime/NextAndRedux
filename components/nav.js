import React from "react";
import { GoMarkGithub } from "react-icons/go";
//import Todos from "./Todos";
import { FaListUl } from "react-icons/fa";

class Nav extends React.Component {
  render() {
    const SIZE = "22";
    return (
      <nav className='navbar is-white'>
        <div className='container' style={{ position: "relative" }}>
          <div className='navbar-brand'>
            <a className='navbar-item brand-text' href='/'>
              Simetik Home
            </a>
          </div>
          <div id='navMenu' className='navbar-menu'>
            <div className='navbar-start'>
              <a
                className='navbar-item'
                href='https://github.com/Vale-Rodriguez15jaime'>
                <GoMarkGithub style={{ marginRight: "3px" }} />
                GitHub
              </a>
            </div>
          </div>
          <div className='todo-button' title='Abrir barra de tareas'>
            <FaListUl />
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
