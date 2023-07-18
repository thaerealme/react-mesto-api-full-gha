import logo from '../images/logo/logo__header.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого шапка" />
      <div className="header__status">
        {props.loggedIn ? (<>
          <p className="header__email">{props.email}</p>
          <Link onClick={props.onQuit} className="header__sign-state">Выйти</Link> </>
          ) : (location.pathname === '/sign-in' ? (<Link to='/sign-up' className="header__sign-state">Регистрация</Link>) : (<Link to='/sign-in' className="header__sign-state">Войти</Link>))}
      </div>
    </header>
  );
}

export default Header;
