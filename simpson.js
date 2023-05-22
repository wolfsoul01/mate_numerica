const math = require('mathjs');
const cliTable = require('cli-table');

function gaussSeidelMethod(matrix, b, tolerance, maxIterations) {
  const n = matrix.length;
  let x = math.zeros(n)._data;
  let xNext = math.zeros(n)._data;
  let iteration = 0;

  const table = new cliTable({
    head: ['Iteración', 'x1', 'x2', 'Error'],
  });

  while (iteration < maxIterations) {
    for (let i = 0; i < n; i++) {
      let sum1 = 0;
      let sum2 = 0;

      for (let j = 0; j < i; j++) {
        sum1 += matrix[i][j] * xNext[j];
      }

      for (let j = i + 1; j < n; j++) {
        sum2 += matrix[i][j] * x[j];
      }

      xNext[i] = (b[i] - sum1 - sum2) / matrix[i][i];
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

  throw new Error(
    'El método de Gauss-Seidel no convergió después de ' +
      maxIterations +
      ' iteraciones.'
  );
}

// Ejemplo de uso:
const matrix = [[5, -1], [1, -3]];
const b = [4, 1];
const tolerance = 0.0001;
const maxIterations = 100;

try {
  const solution = gaussSeidelMethod(matrix, b, tolerance, maxIterations);
  console.log('Solución: ', solution);
} catch (error) {
  console.log(error.message);
}
