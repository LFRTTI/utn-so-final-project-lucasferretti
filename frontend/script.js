<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Estudiantes</title>
    <link rel="stylesheet" href="styles_modern.css">

  </head>
  <body>
    <h1>Lista de Estudiantes</h1>
    <div>
    <input type="text" id="nameInput" placeholder="Escribí tu nombre" />
    <button id="greetButton">Saludarme</button>
    <p id="greetMessage"></p>
    </div>
    <h2>Agregar Estudiante</h2>
    <form id="formAgregarEstudiante">
      <input type="text" id="nuevoNombre" placeholder="Nombre del estudiante" required />
      <button type="submit">Agregar</button>
    </form>
    <p id="mensajeAgregado"></p>

    <button id="loadButton">Cargar Estudiantes</button>
    <table id="studentsTable">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    <script src="script.js"></script>
  </body>
</html>
