import React from 'react';
import {auth} from '../utils/Auth'

function Register (props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmail (e) {
    setEmail(e.target.value);
  }
  function handlePassword (e) {
    setPassword(e.target.value);
  }
  function handleSubmit (e) {
    e.preventDefault();
    props.onSubmit({password, email})
  }
  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <input className="sign-up__input" type="email" name="email" id="email" placeholder="Email" value={email} onChange={handleEmail}/>
        <input className="sign-up__input" type="password" name="password" id="password" placeholder="Пароль" value={password} onChange={handlePassword}/>
        <button type="submit" className="sign-up__submit-button">Зарегистрироваться</button>
      </form>
    </div>
  )
}
export default Register;
