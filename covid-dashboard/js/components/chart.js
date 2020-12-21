const ctx = document.getElementById('chart_id');
const globalCases = [];
const dateStage = [];
const rightDate = [];

let covidChart;

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

  sortData();
};

const sortData = () => {
  globalCases.sort((a, b) => a - b);
  dateStage.sort();

  dateStage.forEach((el) => {
    rightDate.push(formattedDate(el));
  });
};

const monthsNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const formattedDate = (parseDate) => {
  const date = new Date(parseDate);
  return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
};

const createCovidChart = async () => {
  await covidData();

  covidChart = new Chart(ctx, {
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
      labels: rightDate,
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
