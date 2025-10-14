const formulario = document.getElementById('formulario');
const input = document.getElementById('tarea');
const lista = document.getElementById('lista');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

mostrarTareas();

formulario.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim() === '') return alert('Escribe una tarea');
  tareas.push({ texto: input.value, completada: false });
  input.value = '';
  guardar();
  mostrarTareas();
});

function mostrarTareas() {
  lista.innerHTML = '';
  tareas.forEach((tarea, i) => {
    const li = document.createElement('li');
    li.textContent = tarea.texto;
    li.style.textDecoration = tarea.completada ? 'line-through' : 'none';

    li.onclick = () => {
      tarea.completada = !tarea.completada;
      guardar();
      mostrarTareas();
    };

    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = 'X';
    botonBorrar.onclick = () => {
      const confirmar = confirm('¿Seguro que deseas eliminar esta tarea?');
      if (confirmar) {
        tareas.splice(i, 1);
        guardar();
        mostrarTareas();
      }
    };

    li.appendChild(botonBorrar);
    lista.appendChild(li);
  });
}

function guardar() {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}
