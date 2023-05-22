const math = require('mathjs');
const cliTable = require('cli-table');

// ok perro 
function jacobiMethod(matrix, b, tolerance, maxIterations) {
  const n = matrix.length;
  let x = math.zeros(n)._data; // Convertimos el vector a un array
  let xNext = math.zeros(n)._data; // Convertimos el vector a un array
  let iteration = 0;

  const table = new cliTable({
    head: ['Iteración', 'x1', 'x2', 'Error'],
  });

  while (iteration < maxIterations) {
    for (let i = 0; i < n; i++) {
      let sum = 0;
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          sum += matrix[i][j] * x[j];
        }
      }
      xNext[i] = (b[i] - sum) / matrix[i][i];
    }

    let error = math.norm(math.subtract(xNext, x), 'inf');

    table.push([iteration, xNext[0], xNext[1], error]);

    if (error < tolerance) {
      console.log(table.toString());
      return xNext; // Retorna la solución aproximada
    }

    x = [...xNext];
    iteration++;
  }

  throw new Error("El método de Jacobi no convergió después de " + maxIterations + " iteraciones.");
}

// Ejemplo de uso:
//las dos funciones 
const matrix = [[5, -1], [1, -3]];
// a lo que este evaludado la funcion 
const b = [4, 1];
//error 
const tolerance = 0.0001;
//iteraciones 
const maxIterations = 100;

try {
  const solution = jacobiMethod(matrix, b, tolerance, maxIterations);
  console.log("Solución: ", solution);
} catch (error) {
  console.log(error.message);
}
