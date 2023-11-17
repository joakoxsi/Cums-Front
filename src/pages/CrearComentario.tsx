import "katex/dist/katex.min.css";
import { SyntheticEvent, useState } from "react";
import { BlockMath } from "react-katex";
import "../styles/crearComentario.css";

const CrearComentario = () => {
  const searchParams = new URLSearchParams(location.search);
  const [description, setContenido] = useState<string>("");
  const [latex, setLatex] = useState<string>("");

  const id = searchParams.get("id");
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:3000/api/CreateTComment/" + id,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          description,
          latex,
        }),
      }
    );
    console.log(response);
    window.location.href = "/MostrarForo?id=" + id;
  };

  return (
    <div className="crear-comentario-container">
      <h1 className="crear-comentario-title">Crear Comentario</h1>
      <div className="crear-comentario-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Comentario:</label>
            <br></br>
            <input
              type="text"
              value={description}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Comentario en LaTeX:</label>
            <br></br>
            <input
              type="text"
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Resultado en LaTeX:</label>
            <BlockMath>{latex}</BlockMath>
          </div>
          <button type="submit" className="guardar-comentario-btn">
            Guardar Comentario
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

export default CrearComentario;
