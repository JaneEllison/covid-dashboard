const ctx = document.getElementById('chart_id');
const globalCases = [];
const dateStage = [];

const covidData = async () => {
  const response = await fetch('https://corona-api.com/timeline');
  const covidApiData = await response.json();

  const { data } = covidApiData;
  // console.log(covidApiData.data[0].deaths)
  // console.log(covidApiData)

  data.forEach((el) => {
    dateStage.push(el.date);
    globalCases.push(el.confirmed);
  });
};

const createCovidChart = async () => {
  await covidData();

  const covidChart = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [{
        label: 'Global Cases',
        data: globalCases,
        fill: false,
        borderColor: 'red',
        backgroundColor: 'red',
        borderWidth: 1,
      }],
      labels: dateStage,
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
