import Logo from "../../assets/logo-light.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./style.scss";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="menu">
        <div className="navigation">
          {!currentUser ? (
            <Link to="/login">Login / Registro</Link>
          ) : (
            <div className="actions">
              <Link to="/new">Nova Postagem</Link>
              <div className="userInfo">
                <h5 className="username">{currentUser?.username}</h5>
                <Link className="link" onClick={() => logout()}>
                  logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
