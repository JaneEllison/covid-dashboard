const ctx = document.getElementById('chart_id');

const createCovidChart = () => {
  const covidChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Global Cases',
        data: [123],
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        borderWidth: 1,
      }],
      labels: ['dec'],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

createCovidChart();
