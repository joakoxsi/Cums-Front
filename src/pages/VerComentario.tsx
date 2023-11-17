import React, { useEffect, useState } from "react";
import { BlockMath } from "react-katex";
import { useLocation } from "react-router-dom";
import "../styles/verComentario.css";

const VerComentarios: React.FC = () => {
  const location = useLocation();

  const [Descripcion, setDescripcion] = useState("");
  const [Creador, setCreador] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [creacion, setCreacion] = useState("");
  const [latex, setLatex] = useState<string>("");
  const [idF, setidF] = useState<number>();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const handleEnlaceClick = () => {
    var URL = "/MostrarForo?id=" + idF;
    window.location.href = URL;
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:3000/api/GetComment/" + id,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content_1 = await response.json();
      setDescripcion(content_1.description);
      setCreador(content_1.nameCreator);
      setidF(content_1.idTheme);
      // Intenta interpretar la fecha de manera segura
      const fechaCreada = new Date(content_1.creationDate);
      if (!isNaN(fechaCreada.getTime())) {
        setFecha(fechaCreada);

        const year = fechaCreada.getFullYear();
        const month = fechaCreada.getMonth() + 1; // Los meses van de 0 a 11
        const day = fechaCreada.getDate();
        const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
          day < 10 ? "0" : ""
        }${day}`;
        setCreacion(formattedDate);
      } else {
        console.error("Error al interpretar la fecha:", content_1.creationDate);
      }
      setLatex(content_1.latex);
    })();
  }, [id]);
  if (!fecha) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="mostrar-comentario-container">
      <div className="comentario-info">
        <h6>Fecha: {creacion}</h6>
        <h6>Creador: {Creador}</h6>
        <h6>Descripción: {Descripcion}</h6>
        <h6>Comentario en LaTeX:</h6>
        <BlockMath>{latex}</BlockMath>

        <button
          onClick={() => {
            handleEnlaceClick();
          }}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default VerComentarios;
