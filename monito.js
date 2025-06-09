// Sincroniza el tipo de animal según el número de jaula
const jaulaInput = document.getElementById('jaula');
const tipoSelect = document.getElementById('tipo');

jaulaInput.addEventListener('input', () => {
  const mapJaulaTipo = {
    1: 'felino',
    2: 'ave',
    3: 'reptil',
    4: 'anfibio',
    5: 'pez',
    6: 'insecto',
    7: 'arácnido'
  };

  const tipo = mapJaulaTipo[jaulaInput.value];
  if (tipo) {
    tipoSelect.value = tipo;
  }
});

// Clase para modelar cada animal
class CZooAnimal {
  constructor(nombre, tipo, jaula, peso) {
    this.nombre = nombre;
    this.tipo = tipo.toLowerCase(); // uniforme en minúsculas
    this.jaula = jaula;
    this.peso = peso;
  }
}

const zooAnimals = [];
const form = document.getElementById('animalForm');
const tablaAnimales = document.querySelector('#tablaAnimales tbody');

// Actualiza los contadores de tipos en la sección resultados
function actualizarContadores() {
  const tipos = zooAnimals.reduce((acc, animal) => {
    acc[animal.tipo] = (acc[animal.tipo] || 0) + 1;
    return acc;
  }, {});

  document.getElementById('contadorAves').textContent = tipos['ave'] || 0;
  // Mamíferos no están en el select, pero lo dejamos por si se agregan
  document.getElementById('contadorMamiferos').textContent = tipos['mamifero'] || tipos['mamífero'] || 0;
  document.getElementById('contadorFelinos').textContent = tipos['felino'] || 0;
}

// Manejo de envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const tipo = document.getElementById('tipo').value.trim().toLowerCase();
  const jaula = parseInt(document.getElementById('jaula').value);
  const peso = parseFloat(document.getElementById('peso').value);

  if (zooAnimals.length <= 7) {
    const animal = new CZooAnimal(nombre, tipo, jaula, peso);
    zooAnimals.push(animal);
    form.reset();

    // Agregar el nuevo animal a la tabla
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${animal.nombre}</td>
      <td>${animal.tipo}</td>
      <td>${animal.jaula}</td>
      <td>${animal.peso}</td>
    `;
    tablaAnimales.appendChild(fila);

    // Actualiza los contadores en vivo
    actualizarContadores();

    // Al llegar a 5 animales mostrar resultados con document.write
    if (zooAnimals.length === 5) {
      mostrarResultados();
    }
  } else {
    alert("Ya se ingresaron los 5 animales.");
  }
});

// Mostrar resultados finales con document.write
function mostrarResultados() {
  document.write("<h2>Resultados del Zoo</h2>");

  const jaula5Menor3kg = zooAnimals.filter(a => a.jaula === 5 && a.peso < 3).length;
  document.write("<p><b>Cantidad de animales en jaula 5 con peso menor a 3 kg:</b> " + jaula5Menor3kg + "</p>");

  const felinos2a5 = zooAnimals.filter(a => a.tipo === "felino" && a.jaula >= 2 && a.jaula <= 5).length;
  document.write("<p><b>Cantidad de felinos en jaulas 2 a 5:</b> " + felinos2a5 + "</p>");

  const animalJaula4 = zooAnimals.find(a => a.jaula === 4 && a.peso < 120);
  const nombreAnimal = animalJaula4 ? animalJaula4.nombre : "No encontrado";
  document.write("<p><b>Nombre del animal en jaula 4 con peso < 120:</b> " + nombreAnimal + "</p>");

  document.write("<h3>Tabla de Animales</h3>");
  document.write("<table border='1' cellpadding='5'><tr><th>Nombre</th><th>Tipo</th><th>Jaula</th><th>Peso</th></tr>");
  zooAnimals.forEach(animal => {
    document.write(`<tr><td>${animal.nombre}</td><td>${animal.tipo}</td><td>${animal.jaula}</td><td>${animal.peso}</td></tr>`);
  });
  document.write("</table>");
}

// Bloquear click derecho en toda la página
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});
