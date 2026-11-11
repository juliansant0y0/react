//Sirve como el punto de entrada que renderiza App dentro del DOM HTML.

// 1. Importa la librería principal de React para manejar componentes y JSX
import React from 'react';
// 2. Importa la herramienta de React 18+ para conectar la app con el navegador (DOM)
import { createRoot } from 'react-dom/client';
// 3. Importa el componente principal de la aplicación (donde está tu interfaz)
import App from './App';
// 4. Busca en el archivo index.html el elemento contenedor <div id="root"></div>
const container = document.getElementById('root');
// 5. Prepara y crea la "raíz" de React dentro del contenedor HTML seleccionado
const root = createRoot(container);
// 6. Transforma el componente <App /> en HTML real y lo dibuja dentro de la pantalla
root.render(<App />);
