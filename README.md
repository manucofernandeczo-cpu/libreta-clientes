# Libreta de Clientes

Una hoja por cliente, con buscador. Los datos se guardan solos en tu PC.

## Probarla
    npm install
    npm start

## Crear el instalador .exe (en Windows)
    npm run dist
El instalador queda en la carpeta `dist/`.

## Uso rápido
- **+ Nuevo cliente**: te pide el nombre y crea su hoja.
- **Buscador**: filtra mientras escribís; Enter abre el primer resultado.
- Cada hoja arranca con un ítem (•), pero podés borrarlo y escribir libre.
- Hoja nueva: se crea sola al llenarse, o con Enter en una línea vacía al final de la hoja, o con Ctrl+Enter.
- **Copiar**: copia al portapapeles el nombre y todo el contenido del cliente (todas sus hojas) como texto.
- Cada ítem nuevo guarda la fecha en que lo anotaste (a la derecha). Si borrás todo el texto de una hoja (que no sea la primera), la hoja desaparece.
