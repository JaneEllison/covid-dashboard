const countries = document.querySelector('.countries');
const table = document.querySelector ('.table');
const fullscreenTableBtn = document.querySelector ('.fullscreen__table');

const countryFlag = document.querySelector('.country__flag');
const countryName = document.querySelector('.country__name');

const tableConfirmed = document.querySelector('.table__confirmed');
const tableDeath = document.querySelector('.table__death');
const tableRecovered = document.querySelector('.table__recovered');

const tableSwitherDays = document.querySelector('.table__swither_days');
const arrowLeftDays = document.querySelector('.arrow__left_days');
const tableGlobal = document.querySelector('.table__global');
const tableDaily = document.querySelector('.table__daily');
const arrowRightDays = document.querySelector('.arrow__right_days');

const tableSwitherCount = document.querySelector('.table__swither_count');
const arrowLeftCount = document.querySelector('.arrow__left_count');
const tableAll = document.querySelector('.table__all');
const tablePer100 = document.querySelector('.table__per100');
const arrowRightCount = document.querySelector('.arrow__right_count');

const totalBtn = document.querySelector('.total__btn');
const mapid = document.getElementById('mapid');

let countryCasesData;
let allCasesData;
let isGlobalCasesMode = true;
let isAllCasesMode = true;
let currentCountry;
let currentCountryData;
let isCountryMode;
const worldPopulationPer100 = 78270;

const getData = async () => {
  countryCasesData = await fetch('https://corona.lmao.ninja/v2/countries').then(res => res.json());
  allCasesData = await fetch('https://api.covid19api.com/summary').then(res => res.json());          
};

const getInfoTable = async () => {

  await getData();

  if(isCountryMode) return;

  let confirmed;
  let death;
  let recovered;

  if (isGlobalCasesMode && isAllCasesMode) {
    confirmed = allCasesData.Global.TotalConfirmed;
    death = allCasesData.Global.TotalDeaths;
    recovered = allCasesData.Global.TotalRecovered;
  }

  else if (!isGlobalCasesMode && isAllCasesMode) {
    confirmed = allCasesData.Global.NewConfirmed;
    death = allCasesData.Global.NewDeaths;
    recovered = allCasesData.Global.NewRecovered;
  }

  else if (isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(allCasesData.Global.TotalConfirmed / worldPopulationPer100);
    death = Math.round(allCasesData.Global.TotalDeaths / worldPopulationPer100);
    recovered = Math.round(allCasesData.Global.TotalRecovered / worldPopulationPer100);
  }

  else if (!isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(allCasesData.Global.NewConfirmed / worldPopulationPer100);
    death = Math.round(allCasesData.Global.NewDeaths / worldPopulationPer100);
    recovered = Math.round(allCasesData.Global.NewRecovered / worldPopulationPer100);
  }

  createCountryTable('World', '../assets/images/world-icon.png', confirmed, death, recovered);
};

const getCurrentCountry = () => {
  currentCountryData = countryCasesData.find(country => currentCountry === country.country);
};

const getCountryInfo = async () => {
  await getData();

  if(!isCountryMode) return;

  let confirmed;
  let death;
  let recovered;

  if (isGlobalCasesMode && isAllCasesMode) {
    confirmed = currentCountryData.cases;
    death = currentCountryData.deaths;
    recovered = currentCountryData.recovered;
  }

  else if (!isGlobalCasesMode && isAllCasesMode) {
    confirmed = currentCountryData.todayCases;
    death = currentCountryData.todayDeaths;
    recovered = currentCountryData.todayRecovered;
  }

  else if (isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(currentCountryData.casesPerOneMillion / 10);
    death = Math.round(currentCountryData.deathsPerOneMillion / 10);
    recovered = Math.round(currentCountryData.recoveredPerOneMillion / 10);
  }

  else if (!isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(currentCountryData.todayCases / currentCountryData.population * 100000);
    death = Math.round(currentCountryData.todayDeaths / currentCountryData.population * 100000);
    recovered = Math.round(currentCountryData.todayRecovered / currentCountryData.population * 100000);
  }

  createCountryTable(currentCountryData.country, currentCountryData.countryInfo.flag, confirmed, death, recovered);

}

const createCountryTable = (country, flag, confirmed, death, recovered) => {
  countryFlag.innerHTML = `<img src="${flag}" class="flag__img">`;
  countryName.innerText = country;

  tableConfirmed.innerText = confirmed;
  tableDeath.innerText = death;
  tableRecovered.innerText = recovered;
};

//clean numbers
const cleanTable = () => {
  tableConfirmed.innerHTML = '';
  tableDeath.innerHTML = '';
  tableRecovered.innerHTML = '';
};

const changeTableNameMode = (firstMode, secondMode) => {
  firstMode.classList.toggle('hide');
  secondMode.classList.toggle('hide');
}

const changeTableArrows = (firstArrow, secondArrow) => {
  firstArrow.classList.toggle('unactive');
  secondArrow.classList.toggle('unactive');
};

//days swither right
arrowRightDays.addEventListener('click', () => {
  
  if(isGlobalCasesMode) {
    changeTableNameMode(tableGlobal, tableDaily);
    changeTableArrows(arrowLeftDays, arrowRightDays);
    isGlobalCasesMode = false;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//days swither left
arrowLeftDays.addEventListener('click', () => {

  if(!isGlobalCasesMode) {
    changeTableNameMode(tableGlobal, tableDaily);
    changeTableArrows(arrowLeftDays, arrowRightDays);
    
    isGlobalCasesMode = true;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//count swither right
arrowRightCount.addEventListener('click', () => {

  if(isAllCasesMode) {
    changeTableNameMode(tableAll, tablePer100);
    changeTableArrows(arrowLeftCount, arrowRightCount);
    isAllCasesMode = false;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//count swither left
arrowLeftCount.addEventListener('click', () => {

  if(!isAllCasesMode) {
    changeTableNameMode(tableAll, tablePer100);
    changeTableArrows(arrowLeftCount, arrowRightCount);
    isAllCasesMode = true;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

countries.addEventListener ('click', (event) => {
  const countryNameChart = document.querySelector('.chart__country_name');
  let target = event.target;

  if (target.className !== 'country__name' || target.innerText === currentCountry) {
    return;
  } 
  
  currentCountry = target.innerText;  
  countryNameChart.innerText = currentCountry;
  isCountryMode = true;

  cleanTable();
  getCurrentCountry(); 
  getCountryInfo();

});

mapid.addEventListener('click', (event)=> {
  const countryNameChart = document.querySelector('.chart__country_name');
  let target = event.target;

  if(target.className !== 'covid__country') {
    return currentCountry = currentCountry;
  }
  
  currentCountry = target.innerText.slice(0, -1);
  countryNameChart.innerText = currentCountry;
  isCountryMode = true;

  getCurrentCountry(); 
  getCountryInfo();
})

//return to total cases
totalBtn.addEventListener ('click', () => {
  isCountryMode = false;
  cleanTable();
  getInfoTable();
});

//add full Screen
fullscreenTableBtn.addEventListener('click', () => {
  if(!document.fullscreen) {
    table.requestFullscreen();
    fullscreenTableBtn.style.top = '0.5rem';
    fullscreenTableBtn.style.right = '0.5rem';
  } else {
    document.exitFullscreen();
    fullscreenTableBtn.style.top = '-0.4rem';
    fullscreenTableBtn.style.right = '-0.4rem';
  };
});

document.addEventListener ('DOMContentLoaded', () => {
  getInfoTable();
});