import { SyntheticEvent, useState } from "react";
import "../styles/login.css";

const Login = (props: { setName: (name: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (e: SyntheticEvent) => {
    try {
      e.preventDefault();

      if (!email || !password) {
        setErrorMessage("Please enter both email and password");
        return;
      }

      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const content = await response.json();

      props.setName(content.name);

      window.location.href = "/";
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={submit}>
      <h1 className="h3 mb-3 fw-normal">Ingreso</h1>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="form-floating">
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
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
      <button className="btn btn-primary w-100 py-2" type="submit">
        Ingresar
      </button>
    </form>
  );
};

export default Login;
