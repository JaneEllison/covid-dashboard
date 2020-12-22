const chartGlobal = document.getElementById('chart_global_id');
const globalCasesButton = document.querySelector('.chart__control_global');

const worldCases = document.querySelector('.chart__global');

const chartDaily = document.getElementById('chart_daily_id');
const dailyCasesButton = document.querySelector('.chart__control_daily');

const globalCases = [];
const dateStage = [];
const rightDate = [];

const newConfirmed = [];
let lastDate = '';
const newRecovered = [];
const newDeaths = [];

let globalChartCreated;
let dailyChartCreated;

let isShowChart = true;

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

  newConfirmed.push(data[0].new_confirmed);
  newRecovered.push(data[0].new_recovered);
  newDeaths.push(data[0].new_deaths);
  lastDate += data[0].date;

  sortData();
  createDailyChart();
};

const sortData = () => {
  globalCases.sort((a, b) => a - b);
  dateStage.sort();

  dateStage.forEach((el) => {
    rightDate.push(formattedDate(el));
  });

//   lastDate += dateStage[dateStage.length - 1];
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

const createGlobalChart = async () => {
  worldCases.classList.add('active');

  await covidData();

  globalChartCreated = new Chart(chartGlobal, {
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

const globalChartAction = () => {
  if (!isShowChart) {
    chartDaily.classList.remove('active');
    worldCases.classList.add('active');
    isShowChart = true;
  }
};

const dailyChartAction = () => {
  if (isShowChart) {
    worldCases.classList.remove('active');
    chartDaily.classList.add('active');
    isShowChart = false;
  }
};

const createDailyChart = () => {
  dailyChartCreated = new Chart(chartDaily, {
    type: 'doughnut',
    data: {
      datasets: [
        {
          label: 'Today`s Chart',
          backgroundColor: ['#3e95cd', '#8e5ea2', '#3cba9f'],
          data: [newConfirmed, newRecovered, newDeaths],
        },
      ],
      labels: [
        'New Confirmed',
        'New Recovered',
        'New Deaths',
      ],
    },
    options: {
      title: {
        display: true,
        text: `Today\`s Cases: ${lastDate}`,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

globalCasesButton.addEventListener('click', () => globalChartAction());
dailyCasesButton.addEventListener('click', () => dailyChartAction());
createGlobalChart();
