import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext.js";
import Button from "../Button/Button.jsx";
// import { api } from "../../services/api.js";

const Login = (props) => {
  const { isEditing, changeLogin } = props;

  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setTimeout(() => setMsg(""), 2000);
  },[msg])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(Inputs);
      setMsg("Login efetuado com Sucesso!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMsg(err.response.data);
    }
  };

  return (
    <div
      className="auth"
      style={{ display: isEditing === false ? "flex" : "none" }}
    >
      <form action="POST" onSubmit={handleSubmit}>
        {msg ? <h2 className="errMsg">{msg}</h2> : <h2>Login</h2>}
        <div className="inputs">
          <label htmlFor="username">E-mail:</label>
          <input
            type="e-mail"
            name="email"
            placeholder="Digite seu e-mail"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            placeholder="Digite sua senha"
            onChange={handleChange}
            required
          />
        </div>
        <Button text={"Efetuar Login"} />
      </form>
      <p>
        Não possui uma conta?
        <span onClick={() => changeLogin()}> Clique para se cadastrar.</span>
      </p>
    </div>
  );
};

export default Login;
