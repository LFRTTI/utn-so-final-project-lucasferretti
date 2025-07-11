
async function loadStudents() {
  const resp   = await fetch("/api/students");
  const data   = await resp.json();
  const tbody  = document.querySelector("#studentsTable tbody");

  tbody.innerHTML = "";
  data.forEach(({ id, name }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${id}</td><td>${name}</td>`;
    tbody.appendChild(row);
  });
}


document
  .getElementById("loadButton")
  .addEventListener("click", loadStudents);


document
  .getElementById("addStudentForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("studentName");
    const name      = nameInput.value.trim();
    if (!name) return;

    await fetch("/api/students", {
      method : "POST",
      headers: { "Content-Type": "application/json" },
      body   : JSON.stringify({ name })
    });

    nameInput.value = "";
    await loadStudents();          // refresco la tabla al instante
  });


document
  .getElementById("greetButton")
  .addEventListener("click", async () => {
    const name = document.getElementById("nameInput").value.trim();
    const resp = await fetch(`/api/greet?name=${encodeURIComponent(name)}`);
    const { message } = await resp.json();
    document.getElementById("greetResult").innerText = message;
  });
