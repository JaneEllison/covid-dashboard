const chartGlobal = document.getElementById('chart_global_id');
const globalCasesButton = document.querySelector('.chart__control_global');

const worldCases = document.querySelector('.chart__global');

const chartDaily = document.getElementById('chart_daily_id');
const dailyCasesButton = document.querySelector('.chart__control_daily');

const chartHundred = document.getElementById('chart_hundred_id');
const hundredCasesButton = document.querySelector('.chart__control_hundred');

const globalConfirmed = [];
const globalDeaths = [];
const globalRecovered = [];
const dateStage = [];
const rightDate = [];

const newConfirmed = [];
let lastDate = '';
const newRecovered = [];
const newDeaths = [];

let globalChartCreated;
let dailyChartCreated;
let hundredChartCreated;

let isShowChart = true;
let isHundredChart = true;

const worldPopulationPer100 = 78270;
const globalHundredCases = [];

const covidData = async () => {
  const response = await fetch('https://corona-api.com/timeline');
  const covidApiData = await response.json();

  const { data } = covidApiData;

  data.forEach((el) => {
    dateStage.push(el.date);
    globalConfirmed.push(el.confirmed);
    globalDeaths.push(el.deaths);
    globalRecovered.push(el.recovered);

    globalHundredCases.push(Math.round(el.confirmed / worldPopulationPer100));
  });

  newConfirmed.push(data[0].new_confirmed);
  newRecovered.push(data[0].new_recovered);
  newDeaths.push(data[0].new_deaths);
  lastDate += data[0].date;

  sortData();
  createDailyChart();
  createHundredChart();
};

const sortData = () => {
  globalConfirmed.sort((a, b) => a - b);
  globalDeaths.sort((a, b) => a - b);
  globalRecovered.sort((a, b) => a - b);
  globalHundredCases.sort((a, b) => a - b);
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
      datasets: [
        {
          label: 'Global Confirmed',
          data: globalConfirmed,
          fill: false,
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd',
          borderWidth: 1,
        },
        {
          label: 'Global Recovered',
          data: globalRecovered,
          fill: false,
          borderColor: '#8e5ea2',
          backgroundColor: '#8e5ea2',
          borderWidth: 1,
        },
        {
          label: 'Global Deaths',
          data: globalDeaths,
          fill: false,
          borderColor: '#3cba9f',
          backgroundColor: '#3cba9f',
          borderWidth: 1,
        },
      ],
      labels: rightDate,
    },
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 50,
          fontColor: 'black',
        },
      },
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
  if (!isShowChart || !isHundredChart) {
    chartDaily.classList.remove('active');
    worldCases.classList.add('active');
    chartHundred.classList.remove('active');
    isShowChart = true;
    isHundredChart = true;
  }
};

const dailyChartAction = () => {
  if (isShowChart || !isHundredChart) {
    worldCases.classList.remove('active');
    chartDaily.classList.add('active');
    chartHundred.classList.remove('active');
    isShowChart = false;
    isHundredChart = true;
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

const hundredChartAction = () => {
  if (isHundredChart) {
    worldCases.classList.remove('active');
    chartDaily.classList.remove('active');
    chartHundred.classList.add('active');
    isHundredChart = false;
  }
};

const createHundredChart = () => {
  hundredChartCreated = new Chart(chartHundred, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Global Per 100 Confirmed',
          data: globalHundredCases,
          fill: false,
          borderColor: '#3e95cd',
          backgroundColor: '#3e95cd',
          borderWidth: 1,
        },
      ],
      labels: rightDate,
    },
    options: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 50,
          fontColor: 'antiquewhite',
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  });
};

globalCasesButton.addEventListener('click', () => globalChartAction());
dailyCasesButton.addEventListener('click', () => dailyChartAction());
hundredCasesButton.addEventListener('click', () => hundredChartAction());
createGlobalChart();
