// User.tsx
import { useEffect, useState } from "react";
import "../styles/user.css";

const User = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [foros, setForos] = useState<string[]>([]);
  const [idF, setId] = useState([]);

  const handleEnlaceClick = (index: number) => {
    var URL = "/MostrarForo?id=" + idF[index];
    window.location.href = URL;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();

      // Set the user name in the Home component's state
      if (content.name != undefined) {
        setUserName(content.name);
        setUserEmail(content.email);
      } else {
        setUserName("");
        setUserEmail("");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:3000/api/GetThemesByUser",
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content = await response.json();
      setId(content.map((item: any) => item.idBlog));

      // Solo muestra los últimos 10 foros
      setForos(content.slice(0, 10).map((item: any) => item.theme));
    })();
  }, []);

  return (
    <div id="Main-container">
      <div className="UserInfo-container">
        <h1>{userName !== "" ? userName : "No estás logeado"}</h1>
        <h2>{userName !== "" ? userEmail : ""}</h2>
      </div>
      <div className="Foros-container">
        <h3>Últimos foros que creaste:</h3>
        {foros.length > 0 ? (
          foros.map((foro, index) => (
            <a
              key={index}
              href="#"
              id="miEnlace"
              onClick={() => {
                handleEnlaceClick(index);
              }}>
              {"Tema " + (index + 1) + ": " + foro}
            </a>
          ))
        ) : (
          <p>Todavía no has creado ningún foro.</p>
        )}
      </div>
    </div>
  );
};

export default User;
