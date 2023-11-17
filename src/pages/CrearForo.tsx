import { SyntheticEvent, useState } from "react";
import { BlockMath } from "react-katex";
import "../styles/crearForo.css";

const CrearForo = () => {
  const [theme, setNombreForo] = useState("");
  const [description, setContenidoForo] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/CreateTheme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        theme,
        description,
      }),
    });
    console.log(response);
    window.location.href = "/foros";
  };

  return (
    <div className="crear-foro-container">
      <h1 className="crear-foro-title">Crear Foro</h1>
      <div className="crear-foro-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Foro:</label>
            <br></br>
            <input
              type="text"
              value={theme}
              onChange={(e) => setNombreForo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Contenido del Foro:</label>
            <br></br>
            <textarea
              value={description}
              onChange={(e) => setContenidoForo(e.target.value)}
              style={{ maxHeight: "200px", resize: "none" }}
            />
          </div>
          <div className="form-group">
            <label>Resultado en LaTeX:</label>
            <BlockMath>{description}</BlockMath>
          </div>
          <button type="submit" className="guardar-foro-btn">
            Guardar Foro
          </button>
        </form>
      </div>
      <div className="latex-disclaimer-crear-foro">
        <p>Formatos de LaTeX y sus resultados:</p>
        <div className="latex-example">
          <p>Integral:</p>
          <p>\int_a^b f(x) \,dx</p>
          <p>Resultado:</p>
          <BlockMath>{`\\int_a^b f(x) \\,dx`}</BlockMath>
        </div>
        <div className="latex-example">
          <p>Sumatoria:</p>
          <p>{`\\sum_{n=1}^\\infty a_n`}</p>
          <p>Resultado:</p>
          <BlockMath>{`\\sum_{n=1}^\\infty a_n`}</BlockMath>
        </div>
        {/* Agrega más ejemplos según sea necesario */}
      </div>
    </div>
  );
};

export default CrearForo;
