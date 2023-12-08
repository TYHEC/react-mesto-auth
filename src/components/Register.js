import React from 'react';
import { Link } from 'react-router-dom';
function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password)
    }
    return (
        <section className='authorization'>
            <h3 className='authorization__title'>Регистрация</h3>
            <form className='authorization__form' onSubmit={handleSubmit}>
                <input className="authorization__input" required placeholder="Email" type="email" onChange={handleEmail}></input>
                <input className="authorization__input" required placeholder="Password" type="password" onChange={handlePassword}></input>
                <button className="authorization__button" type="submit">Зарегистрироваться</button>
            </form>
            <p className="authorization__subtitle">Уже зарагистрированны?<Link to='/sign-in' className="authorization__link">Войти</Link></p>

        </section>
    )
}
export default Register;