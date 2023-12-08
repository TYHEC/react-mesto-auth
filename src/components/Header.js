import { Link } from "react-router-dom";

function Header(props) {
    return (
        <header className="header">
            <div className="header__logo" ></div>
            <div className="header__auth-area">
                <p className="header__link">{props.email}</p>
                <Link to={props.route} className="header__link" type="button" onClick={props.onClick}>{props.title}</Link>
            </div>
        </header>)
}
export default Header;