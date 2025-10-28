# CV Web Template (Matrix theme)

Plantilla pública para un CV/portfolio web con efecto "Matrix", tema día/noche, consola de visitante y animaciones.

**Author (template packaging & comments):** Facundo Camacho — facundo@flowit-ar.com

> Nota: El contenido visible en la página es genérico / de ejemplo. Reemplaza los placeholders (YOUR_NAME, example@example.com, etc.) antes de publicar.

## Archivos
- `index.html` — HTML principal
- `style.css` — Estilos (colores, layout, responsive)
- `matrix.js` — Fondo "Matrix" (canvas)
- `main.js` — Interacciones: theme toggle, console, typewriter, fade-in
- `LICENSE` — MIT
- `.gitignore` — (sugerido)

## Cómo usar
1. Clona o crea un repo y pega los archivos.
2. Edita `index.html` para reemplazar los placeholders por tu información.
3. Opcional: ajusta `matrix.js` (velocidad, densidad) y `style.css` a tu gusto.
4. Para publicar en GitHub Pages:
   - Push al repo y en Settings -> Pages selecciona la rama `main` y carpeta `/root`.
   - Espera unos minutos y tu sitio estará online en `https://<usuario>.github.io/<repo>/`.

## Licencia
MIT — ver `LICENSE`.

## Seguridad / privacidad
- La consola de visitante usa `https://api.ipify.org` solo para obtener la IP pública del visitante. Esto es una llamada pública y no guarda datos en este repo.
- Si no querés usar la IP, borra el bloque relevante en `main.js`.

## Firma del empaquetador
Template empaquetado por **Facundo Camacho** — facundo@flowit-ar.com
