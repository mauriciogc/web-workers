# Generación de Números Aleatorios y Cálculos Estadísticos con Web Workers

Este proyecto demuestra cómo realizar cálculos intensivos de generación de números aleatorios y estadísticas (como suma, promedio, desviación estándar, etc.) en segundo plano utilizando **Web Workers** para evitar el bloqueo del hilo principal de la aplicación.

## Descripción

En este proyecto, se realiza lo siguiente:

1. Se genera un número aleatorio entre 1 y 100,000,000.
2. Con base en este número, se generan esa cantidad de números aleatorios y se almacenan en un arreglo.
3. Se realizan varios cálculos estadísticos sobre los números generados:
   - **Suma total**.
   - **Promedio**.
   - **Desviación estándar**.
   - **Mínimo y máximo**.
4. Se muestra un contador en la página que se actualiza cada segundo para demostrar cómo la interfaz sigue respondiendo mientras los cálculos se realizan en segundo plano utilizando **Web Workers**.

## Versiones

- [1.0.0](https://github.com/mauriciogc/web-workers/tree/1.0.0) - Esta versión incluye los cálculos mencionados en la descripción anteriormente mencionada [Ver desde Codesandbox.io](https://codesandbox.io/p/sandbox/web-worker-example-3-up2qet).

- [2.0.0](https://github.com/mauriciogc/web-workers/tree/2.0.0) - Esta versión incluye los cálculos mencionados en la descripción anteriormente mencionada más un gráfico que se va moviendo en tiempo real[Ver desde Codesandbox.io](https://codesandbox.io/p/sandbox/web-worker-example-3-forked-f5p2pn?workspaceId=b0cbbc3f-2841-46e6-9d3f-b72a944d4bb9).

## Requisitos

- Navegador con soporte para **Web Workers**.
- Extensión **Live Server** de Visual Studio Code o cualquier servidor local para ejecutar el proyecto.

## Estructura del Proyecto

```plaintext
/project-root
    ├── index.html       --> Archivo HTML principal
    ├── main.js          --> Código JavaScript principal que comunica con el worker
    └── worker.js        --> Lógica del Web Worker que realiza los cálculos intensivos
```

## Instalación y Uso

1. Clona este repositorio:

   ```bash
   https://github.com/mauriciogc/web-workers.git
   ```

2. Inicia el servidor:
   - Si estás usando Visual Studio Code, puedes iniciar el proyecto usando la extensión Live Server o cualquier servidor local.
   - Abre el archivo index.html en tu navegador.

- Interacción:
  - El contador en la página se incrementará cada segundo.
  - Se generarán números aleatorios y se realizarán cálculos estadísticos en segundo plano.
  - Los resultados se mostrarán en la página junto con el tiempo de ejecución.
