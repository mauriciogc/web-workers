if (window.Worker) {
  const worker = new Worker('worker.js');
  let minNumber = 1000000;
  let maxNumber = 9000000;
  let contadorLabels = 0;
  let myChart;
  // Función para generar números aleatorios entre min y max
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function initGraph() {
    // Gráfica para los números aleatorios
    const ctx = document.getElementById('myChart').getContext('2d');

    // Crear la gráfica inicial con Chart.js (números aleatorios)
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Números aleatorios',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  // Función para actualizar la gráfica de números aleatorios
  function updateGraph(newValue) {
    const labels = myChart.data.labels;
    const data = myChart.data.datasets[0].data;

    // Limitar la cantidad de datos mostrados en la gráfica (10 puntos como máximo)
    if (labels.length > 10) {
      labels.shift();
      data.shift();
    }

    // Añadir nuevo valor y su etiqueta a la gráfica
    // Usamos el contadorLabels para numerar de manera continua
    labels.push(++contadorLabels);
    data.push(newValue);

    // Refrescar la gráfica
    myChart.update();
  }

  // Función para generar número y mandarlo al worker
  function generateRandomData() {
    const quantityNumbers = generateRandomNumber(minNumber, maxNumber);

    // Enviar al worker para realizar los cálculos
    worker.postMessage(quantityNumbers);

    // Mostrar la cantidad de números que se están generando
    document.getElementById('send').innerText = `
      Se está generando con: ${new Intl.NumberFormat().format(
        quantityNumbers
      )} números aleatorios
      --------------------------------------------------
    `;
  }

  // Escuchar la respuesta del worker
  worker.addEventListener('message', (e) => {
    const {
      timeExecution,
      quantityNumbers,
      sumTotal,
      average,
      deviationStandard,
      min,
      max,
    } = e.data;

    // Mostrar los resultados en pantalla
    document.getElementById('result').innerText = `
      --------------------------------------------------
      Tiempo en generarse: ${timeExecution} segundos
      Se generaron: ${quantityNumbers}
      Total de la suma de los números random: ${sumTotal}
      Promedio: ${average}
      Desviación Estándar: ${deviationStandard}
      Número Mínimo Random: ${min}
      Número Máximo Random: ${max}
      ${document.getElementById('result').innerText}
    `;

    // Actualizar la gráfica de números aleatorios enviados
    updateGraph(quantityNumbers.split(',').join(''));

    //Generamos numero
    generateRandomData();
  });

  //Generamos grafica
  initGraph();

  //Pintamos un número incremental cada 1segundo
  let incrementalNumber = 0;
  setInterval(() => {
    document.getElementById('incrementalNumber').innerText =
      ++incrementalNumber;
  }, 1000);

  //Generamos numero
  generateRandomData();
} else {
  document.getElementById('resultado').innerText =
    'Tu navegador no soporta Web Workers.';
}
