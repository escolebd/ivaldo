let myChart = null; // Variável global para o gráfico

function Eq2Grau() {
  const a = parseInt(document.querySelector("#a").value) || 0;
  const b = parseInt(document.querySelector("#b").value) || 0;
  const c = parseInt(document.querySelector("#c").value) || 0;
  const reply = document.querySelector("#reply");
  let delta = 0;
  let valorDeX = 0;
  let valorDeX1 = 0;

  if (a === 0) {
    reply.innerHTML = "A equação não é de segundo grau!";
    return;
  }

  delta = b * b - 4 * a * c;

  if (delta < 0) {
    reply.innerHTML = `${delta} delta negativo, logo não temos raízes reais.`;
  } else if (delta === 0) {
    valorDeX = -b / (2 * a);
    reply.innerHTML = `
      A raíz da equação ${a === 1 ? "" : a}x² ${b > 0 ? "+" : ""}
      ${b === 0 ? "" : b}${b != 0 ? "x" : ""} 
      ${c > 0 ? "+" : ""} ${c === 0 ? "" : c} = 0 é:
      <br>
      x = ${valorDeX}
    `;
  } else {
    valorDeX = (-b + Math.sqrt(delta)) / (2 * a);
    valorDeX1 = (-b - Math.sqrt(delta)) / (2 * a);
    reply.innerHTML = `
      As raízes da equação ${a === 1 ? "" : a}x² ${b > 0 ? "+" : ""}
      ${b === 0 ? "" : b}${b != 0 ? "x" : ""} 
      ${c > 0 ? "+" : ""} ${c === 0 ? "" : c} = 0 são:
      <br>
      x¹ = ${valorDeX}
      <br>
      x² = ${valorDeX1}
    `;
  }

  // Gerar pontos para o gráfico
  const pontos = gerarPontosParabola(a, b, c);
  plotarGrafico(pontos);
}

function gerarPontosParabola(a, b, c) {
  const pontos = [];
  const inicio = -10; // Valor inicial de x
  const fim = 10; // Valor final de x
  const passo = 0.1; // Incremento de x

  for (let x = inicio; x <= fim; x += passo) {
    const y = a * x * x + b * x + c;
    pontos.push({ x, y });
  }

  return pontos;
}

function plotarGrafico(pontos) {
  const ctx = document.getElementById("grafico").getContext("2d");

  // Destruir o gráfico anterior, se existir
  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: pontos.map(ponto => ponto.x.toFixed(2)),
      datasets: [{
        label: "Parábola",
        data: pontos.map(ponto => ponto.y.toFixed(2)),
        borderColor: "#04aa6d",
        borderWidth: 2,
        fill: false,
      }],
    },
    options: {
      scales: {
        x: {
          type: "linear",
          position: "bottom",
        },
        y: {
          type: "linear",
        },
      },
    },
  });
}