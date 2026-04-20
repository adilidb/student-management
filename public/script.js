const form = document.getElementById('form');
const tableBody = document.querySelector('#table tbody');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

 const data = {
  name: document.getElementById('name').value,
  email: document.getElementById('email').value,
  course: document.getElementById('course').value,
};

  await fetch('/add-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  form.reset();
  loadStudents();
});

async function loadStudents() {
  const res = await fetch('/students');
  const students = await res.json();

  tableBody.innerHTML = '';

  students.forEach((s) => {
    tableBody.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.email}</td>
        <td>${s.course}</td>
      </tr>
    `;
  });
}

loadStudents();