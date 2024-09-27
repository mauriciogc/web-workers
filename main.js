if (window.Worker) {
  const myWorker = new Worker('worker.js');

  // Función para generar números aleatorios entre min y max
  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Función para generar número y mandarlo al worker
  function generateRandomData() {
    const quantityNumbers = generateRandomNumber(1, 100000000);
  
    // Enviar al worker para realizar los cálculos
    myWorker.postMessage(quantityNumbers);
  
    // Mostrar la cantidad de números que se están generando
    document.getElementById('send').innerText = `
      Se está generando con: ${new Intl.NumberFormat().format(quantityNumbers)} números aleatorios
      --------------------------------------------------
    `;
  }

  // Escuchar al worker para pintar resultados y volver a ejecutar
  myWorker.onmessage = function (e) {
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
  
    // Volver a generar nuevos números aleatorios (sin setTimeout)
    generateRandomData();
  };

  //Pintamos un número incremental cada 1segundo
  let incrementalNumber = 0;
  setInterval(() => {
    document.getElementById('incrementalNumber').innerText = ++incrementalNumber;
  }, 1000);

  generateRandomData();
} else {
  document.getElementById('result').innerText = 'Tu navegador no soporta Web Workers';
}