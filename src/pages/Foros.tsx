import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Importa Link desde React Router
import "../styles/Foros.css";

const Foros = () => {
  const [foros, setForos] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [idF, setId] = useState([]);
  const forosPerPage = 10; // Define la cantidad de foros por página
  const handleEnlaceClick = (index: number) => {
    var URL = "/MostrarForo?id=" + idF[index];
    window.location.href = URL;
  };
  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:3000/api/GetTheme", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();

      setForos(content.map((item: any) => item.theme));
      setId(content.map((item: any) => item.idBlog));
    })();
  }, []);

  const indexOfLastForo = currentPage * forosPerPage;
  const indexOfFirstForo = indexOfLastForo - forosPerPage;
  const currentForos = foros.slice(indexOfFirstForo, indexOfLastForo);
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="foros-container">
      <div className="crear-foro-container">
        <Link to="/crear-foro" className="crear-foro-link">
          <button className="crear-foro-btn">Crear Foro</button>
        </Link>
      </div>
      <h1>Foros</h1>
      {currentForos.map((foro, index) => (
        <div key={index} className="foro-container">
          <a
            href="#"
            className="foro-link"
            onClick={() => {
              handleEnlaceClick(index);
            }}>
            {foro}
          </a>
        </div>
      ))}

      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(foros.length / forosPerPage) }).map(
            (_, index) => (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Foros;
