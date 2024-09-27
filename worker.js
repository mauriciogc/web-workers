// Función para generar números aleatorios entre min y max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Escuchar mensaje desde el proceso principal
addEventListener('message', (e) => {
  // Medir el tiempo de ejecución
  const startTime = performance.now();

  //Obtenemos cuantos números aleatorios debemos generar
  const quantityNumbers = e.data;

  // Crear un arreglo con esa cantidad de números aleatorios entre 1 y quantityNumbers
  const dataNumAleatories = Array.from({ length: quantityNumbers }, () =>
    generateRandomNumber(1, quantityNumbers)
  );

  // Suma total
  const sumTotal = dataNumAleatories.reduce((acc, num) => acc + num, 0);

  // Calcular el promedio
  const average = sumTotal / quantityNumbers;

  // Calcular la desviación estándar
  const deviationStandard = Math.sqrt(
    dataNumAleatories.reduce(
      (acc, num) => acc + Math.pow(num - average, 2),
      0
    ) / quantityNumbers
  );

  // Encontrar el mínimo y máximo
  let min = dataNumAleatories[0];
  let max = dataNumAleatories[0];
  dataNumAleatories.forEach((num) => {
    if (num < min) {
      min = num;
    }
    if (num > max) {
      max = num;
    }
  });

  // Medir el tiempo de ejecución
  const endTime = performance.now();
  const timeExecution = (endTime - startTime) / 1000;

  //Guardamos los resultados y les damos formato
  const results = {
    timeExecution: timeExecution.toFixed(2),
    quantityNumbers: new Intl.NumberFormat().format(quantityNumbers),
    sumTotal: new Intl.NumberFormat().format(sumTotal),
    average: new Intl.NumberFormat().format(average.toFixed(2)),
    deviationStandard: new Intl.NumberFormat().format(
      deviationStandard.toFixed(2)
    ),
    min: new Intl.NumberFormat().format(min),
    max: new Intl.NumberFormat().format(max),
  };

  // Enviar los resultados al proceso principal
  postMessage(results);
});
