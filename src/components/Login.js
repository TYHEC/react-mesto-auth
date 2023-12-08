import React from 'react';
function Login(props) {
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
        props.onLogin(email, password)
    }
    return (
        <section className='authorization'>
            <h3 className='authorization__title'>Вход</h3>
            <form className='authorization__form' onSubmit={handleSubmit}>
                <input className="authorization__input" required placeholder="Email" type="email" onChange={handleEmail} ></input>
                <input className="authorization__input" required placeholder="password" type="password" onChange={handlePassword}></input>
                <button className="authorization__button" type="submit">Войти</button>
            </form>
        </section>
    )
}
export default Login;