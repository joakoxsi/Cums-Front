import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    setRedirect(true);
  };

  if (redirect) {
    navigate("/login");
  }

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Registro</h1>

      <div className="form-floating">
        <input
          className="form-control"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="floatingInput">Nombre</label>
      </div>
      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          placeholder="nombre@usm.cl"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Correo institucional</label>
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Contraseña</label>
      </div>

      <div className="form-check text-start my-3"></div>
      <button className="btn btn-primary w-100 py-2" type="submit">
        Guardar
      </button>
    </form>
  );
};

export default Register;
