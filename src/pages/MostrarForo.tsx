import React, { useEffect, useState } from "react";
import { BlockMath } from "react-katex";
import { useLocation } from "react-router-dom";
import "../styles/mostrarForo.css";

const MostrarForos: React.FC = () => {
  const location = useLocation();
  const [comentarios, setComentarios] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [Titulo, setTitulo] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Creador, setCreador] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [creacion, setCreacion] = useState("");
  const [idF, setId] = useState([]);
  const comentariosPerPage = 5;
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const handleEnlaceClickForos = () => {
    var URL = "/Foros";
    window.location.href = URL;
  };
  const handleEnlaceClick = () => {
    var URL = "/crear-comentario?id=" + id;
    window.location.href = URL;
  };
  const handleEnlaceClickComentario = (index: number) => {
    var URL = "/verComentario?id=" + idF[index];
    window.location.href = URL;
  };
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "http://localhost:3000/api/GetComments/" + id,
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const content = await response.json();

      setComentarios(content.map((item: any) => item.nameCreator));
      setId(content.map((item: any) => item.idComment));
    })();
  }, []);
  const indexOfLastComment = currentPage * comentariosPerPage;
  const indexOfFirstComment = indexOfLastComment - comentariosPerPage;
  const currentForos = comentarios.slice(
    indexOfFirstComment,
    indexOfLastComment
  );
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/GetTheme/" + id, {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content_1 = await response.json();

      setTitulo(content_1.theme);
      setDescripcion(content_1.description);
      setCreador(content_1.nameCreator);
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
    })();
  }, []);
  if (!fecha) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="mostrar-foros-container">
      <div className="foro-info">
        <h1>{Titulo}</h1>
        <h6>Fecha: {creacion}</h6>
        <h6>Creador: {Creador}</h6>
        <h6>Descripción: {Descripcion}</h6>
        <h6>Comentario en LaTeX:</h6>
        <BlockMath>{Descripcion}</BlockMath>

        <button
          onClick={() => {
            handleEnlaceClick();
          }}
          className="crear-foro-btn">
          Comenta
        </button>

        <ul className="comentarios-list">
          {currentForos.map((comentarios, index) => (
            <li key={index}>
              <a
                href="#"
                id="miEnlace"
                onClick={() => {
                  handleEnlaceClickComentario(index);
                }}>
                {comentarios}
              </a>
            </li>
          ))}
        </ul>

        <nav>
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(comentarios.length / comentariosPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={() => {
            handleEnlaceClickForos();
          }}
          className="volver-btn">
          Volver
        </button>
      </div>
    </div>
  );
};

export default MostrarForos;
