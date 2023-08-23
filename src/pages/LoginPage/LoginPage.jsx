import Login from "../../components/Login/Login.jsx";
import Register from "../../components/Register/Register.jsx";
import "./style.scss"

import { useState } from "react";

const LoginPage = () => {
  const [isEditing, setisEditig] = useState(false);
  return (
    <div>
      <Login isEditing={isEditing} changeLogin={() => setisEditig(true)} />
      <Register
        isEditing={isEditing}
        changeRegister={() => setisEditig(false)}
      />
    </div>
  );
};

export default LoginPage;
