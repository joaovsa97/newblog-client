import { useState, useEffect } from "react";
import { api } from "../../services/api";
import Button from "../Button/Button";
import zxcvbn from "zxcvbn";

const Register = (props) => {
  const { isEditing, changeRegister } = props;
  const [Inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confpw: "",
  });
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setTimeout(() => setMsg(""), 3000);
  }, [msg]);

  const checkPasswordStrength = (password) => {
    const result = zxcvbn(password);
    return result.score;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const strength = checkPasswordStrength(Inputs.password);

    if (strength >= 3) {
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
          setMsg(err.response.data);
        }
      } else {
        setMsg("As senhas digitadas não conferem");
      }
    } else {
      setMsg("Senha muito fraca. Por favor, escolha uma senha mais forte");
    }
  };
  
  const handleChange = (e) => {
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
      <p>
        Já possui uma conta?
        <span onClick={() => changeRegister()}> Clique para acessá-la</span>
      </p>
    </div>
  );
};

export default Register;
