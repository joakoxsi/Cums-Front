import React, { useState } from "react";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>(""); // Nuevo estado para el nombre del archivo

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name); // Al seleccionar el archivo, establecer el nombre del archivo
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("upload", file);
      formData.append("fileName", fileName); // Agregar el nombre del archivo al formulario

      try {
        const response = await fetch("http://localhost:3000/api/UploadFiles", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Archivo subido con éxito");
        } else {
          console.error("Error al subir el archivo");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <div>
      <h1>Subir archivos</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="upload"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png, .gif, .pdf"
        />
        <input
          type="text"
          placeholder="Nombre del archivo"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <button type="submit">Subir</button>
      </form>
    </div>
  );
};

export default Upload;
