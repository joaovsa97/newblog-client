import { useState } from "react";
import { api } from "../../services/api";
import Button from "../Button/Button";

const Register = (props) => {
  const { isEditing, changeRegister } = props;
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confpw: "",
  });
  const [msg, setMsg] = useState(null);

  setTimeout(() => setMsg(""), 4000);

  const handleSubmit = async (e, response) => {
    e.preventDefault();
    if (Inputs.password === Inputs.confpw) {
      try {
        await api
          .post("/register", Inputs, {
            body: JSON.stringify(Inputs),
            headers: { "Content-Type": "application/json" },
          })
          .then(() => changeRegister());
        setInputs({
          username: "",
          email: "",
          password: "",
          confpw: "",
        });
      } catch (err) {
        setMsg(err.response);
      }
    } else {
      setMsg("As senhas digitadas não conferem");
    }
  };

  const handleChange = (e) => {
    console.log(Inputs);
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div
      className="auth"
      style={{ display: isEditing === true ? "flex" : "none" }}
    >
      <h2>Registro</h2>
      {msg && <h2 className="errMsg">{msg}</h2>}
      <form action="POST" onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="username">Usuário:</label>
          <input
            type="text"
            name="username"
            value={Inputs.username}
            placeholder="Digite seu usuário"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            name="email"
            value={Inputs.email}
            placeholder="Digite o e-mail que deseja cadastrar"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            name="password"
            value={Inputs.password}
            placeholder="Digite uma senha"
            onChange={handleChange}
            required
          />
        </div>
        <div className="inputs">
          <label htmlFor="confpw">Confirmar Senha:</label>
          <input
            type="password"
            name="confpw"
            value={Inputs.confpw}
            placeholder="Confirme sua senha"
            onChange={handleChange}
            required
          />
        </div>
        <Button text={"Efetuar Cadastro"} />
      </form>
      <span onClick={() => changeRegister()}>
        Já possui uma conta? Clique para acessá-la
      </span>
    </div>
  );
};

export default Register;
