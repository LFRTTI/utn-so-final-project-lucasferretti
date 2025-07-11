document.getElementById("loadButton").addEventListener("click", async () => {
  const response = await fetch("/api/students");
  const students = await response.json();
  const tbody = document.querySelector("#studentsTable tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${student.id}</td><td>${student.name}</td>`;
    tbody.appendChild(row);
  });
  document.getElementById('greetButton').addEventListener('click', async () => {
  const name = document.getElementById('nameInput').value;

  try {
    const response = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      throw new Error('El servidor no respondió correctamente');
    }

    const data = await response.json();
    document.getElementById('greetMessage').textContent = data.message;
  } catch (error) {
    document.getElementById('greetMessage').textContent = 'Error al saludar 😢';
    console.error('Error al saludar:', error);
  }
});


document.getElementById('formAgregarEstudiante').addEventListener('submit', async (event) => {
  event.preventDefault(); // Evita que se recargue la página

  const nuevoNombre = document.getElementById('nuevoNombre').value;

  const response = await fetch('/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: nuevoNombre })
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById('mensajeAgregado').textContent = `Estudiante ${data.name} agregado con éxito`;
  } else {
    document.getElementById('mensajeAgregado').textContent = `Error: ${data.message}`;
  }
});

});
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loadButton').click();
});
