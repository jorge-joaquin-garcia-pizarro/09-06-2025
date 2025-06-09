const express = require('express');
const path = require('path');

const app = express();
const PORT = 5500;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'zoo-tp')));

// Ruta raíz - envía el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'zoo-tp', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
