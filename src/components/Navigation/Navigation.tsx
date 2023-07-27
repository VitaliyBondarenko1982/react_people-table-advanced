import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const navLinks = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/people',
    title: 'People',
  },
];

const Navigation = () => (
  <nav
    data-cy="nav"
    className="navbar is-fixed-top has-shadow"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="container">
      <div className="navbar-brand">
        {navLinks.map(({ to, title }) => (
          <NavLink
            className={({ isActive }) => cn('navbar-item', {
              'has-background-grey-lighter': isActive,
            })}
            to={to}
            key={title}
          >
            {title}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);

export default Navigation;
