import {
  collection, addDoc, getDocs, deleteDoc, updateDoc,
  doc, query, where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { db } from './firebase-config.js';

const libroForm = document.getElementById('libroForm');
const listaLibros = document.getElementById('listaLibros');
const buscarInput = document.getElementById('buscarInput');
const librosRef = collection(db, 'libros');

libroForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const titulo = libroForm.titulo.value;
  const autor = libroForm.autor.value;
  const anio = parseInt(libroForm.anio.value);
  const genero = libroForm.genero.value;

  await addDoc(librosRef, { titulo, autor, anio, genero });
  libroForm.reset();
  mostrarLibros();
});

async function mostrarLibros() {
  listaLibros.innerHTML = '';
  const querySnapshot = await getDocs(librosRef);
  querySnapshot.forEach(docSnap => {
    const libro = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${libro.titulo}</strong> - ${libro.autor} (${libro.anio}) - ${libro.genero}
      <button onclick="editarLibro('${docSnap.id}', '${libro.titulo}', '${libro.autor}', ${libro.anio}, '${libro.genero}')">Editar</button>
      <button onclick="eliminarLibro('${docSnap.id}')">Eliminar</button>
    `;
    listaLibros.appendChild(div);
  });
}

async function eliminarLibro(id) {
  await deleteDoc(doc(db, 'libros', id));
  mostrarLibros();
}

window.eliminarLibro = eliminarLibro;

window.editarLibro = (id, titulo, autor, anio, genero) => {
  libroForm.titulo.value = titulo;
  libroForm.autor.value = autor;
  libroForm.anio.value = anio;
  libroForm.genero.value = genero;

  libroForm.onsubmit = async (e) => {
    e.preventDefault();
    const nuevoTitulo = libroForm.titulo.value;
    const nuevoAutor = libroForm.autor.value;
    const nuevoAnio = parseInt(libroForm.anio.value);
    const nuevoGenero = libroForm.genero.value;

    await updateDoc(doc(db, 'libros', id), {
      titulo: nuevoTitulo,
      autor: nuevoAutor,
      anio: nuevoAnio,
      genero: nuevoGenero
    });

    libroForm.reset();
    libroForm.onsubmit = guardarLibro;
    mostrarLibros();
  };
};

function guardarLibro(e) {
  e.preventDefault();
  // Se reemplaza dinámicamente con función anterior al editar
}

async function buscarLibro() {
  const texto = buscarInput.value.trim();
  if (!texto) return mostrarLibros();

  listaLibros.innerHTML = '';
  const q = query(librosRef, where('titulo', '==', texto));
  const resultado = await getDocs(q);

  resultado.forEach(docSnap => {
    const libro = docSnap.data();
    const div = document.createElement('div');
    div.innerHTML = `<strong>${libro.titulo}</strong> - ${libro.autor} (${libro.anio}) - ${libro.genero}`;
    listaLibros.appendChild(div);
  });
}

mostrarLibros();
