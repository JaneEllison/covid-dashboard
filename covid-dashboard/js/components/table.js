const countries = document.querySelector('.countries');

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

let responce;
let responceAll;
let isGlobalCasesMode = true;
let isAllCasesMode = true;
let currentCountry;
let isCountryMode;
const worldPopulationPer100 = 78270;

const fetchData = async () => {
  responce = await fetch('https://corona.lmao.ninja/v2/countries').then(res => res.json());
  responceAll = await fetch('https://api.covid19api.com/summary').then(res => res.json());          
};

const getInfoTable = async () => {

  await fetchData();

  if(isCountryMode) return;

  let confirmed;
  let death;
  let recovered;

  if (isGlobalCasesMode && isAllCasesMode) {
    confirmed = responceAll.Global.TotalConfirmed;
    death = responceAll.Global.TotalDeaths;
    recovered = responceAll.Global.TotalRecovered;
  }

  else if (!isGlobalCasesMode && isAllCasesMode) {
    confirmed = responceAll.Global.NewConfirmed;
    death = responceAll.Global.NewDeaths;
    recovered = responceAll.Global.NewRecovered;
  }

  else if (isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(responceAll.Global.TotalConfirmed / worldPopulationPer100);
    death = Math.round(responceAll.Global.TotalDeaths / worldPopulationPer100);
    recovered = Math.round(responceAll.Global.TotalRecovered / worldPopulationPer100);
  }

  else if (!isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(responceAll.Global.NewConfirmed / worldPopulationPer100);
    death = Math.round(responceAll.Global.NewDeaths / worldPopulationPer100);
    recovered = Math.round(responceAll.Global.NewRecovered / worldPopulationPer100);
  }

  createCountryTable('World', 'assets/images/world-icon.png', confirmed, death, recovered);
};

const getCountryInfo = async () => {
  await fetchData();

  if(!isCountryMode) return;

  let newCountry = responce.find(country => currentCountry === country.country);

  let confirmed;
  let death;
  let recovered;

  if (isGlobalCasesMode && isAllCasesMode) {
    confirmed = newCountry.cases;
    death = newCountry.deaths;
    recovered = newCountry.recovered;
  }

  else if (!isGlobalCasesMode && isAllCasesMode) {
    confirmed = newCountry.todayCases;
    death = newCountry.todayDeaths;
    recovered = newCountry.todayRecovered;
  }

  else if (isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(newCountry.casesPerOneMillion / 10);
    death = Math.round(newCountry.deathsPerOneMillion / 10);
    recovered = Math.round(newCountry.recoveredPerOneMillion / 10);
  }

  else if (!isGlobalCasesMode && !isAllCasesMode) {
    confirmed = Math.round(newCountry.todayCases / newCountry.population * 100000);
    death = Math.round(newCountry.todayDeaths / newCountry.population * 100000);
    recovered = Math.round(newCountry.todayRecovered / newCountry.population * 100000);
  }

  createCountryTable(newCountry.country, newCountry.countryInfo.flag, confirmed, death, recovered);

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

const changeTableDays = () => {
  tableGlobal.classList.toggle('hide');
  tableDaily.classList.toggle('hide');
  
  arrowLeftDays.classList.toggle('unactive');
  arrowRightDays.classList.toggle('unactive');
};

const changeTableCount = () => {
  tableAll.classList.toggle('hide');
  tablePer100.classList.toggle('hide');
  
  arrowLeftCount.classList.toggle('unactive');
  arrowRightCount.classList.toggle('unactive');
};

//days swither right
arrowRightDays.addEventListener('click', () => {
  
  if(isGlobalCasesMode) {
    changeTableDays();
    isGlobalCasesMode = false;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//days swither left
arrowLeftDays.addEventListener('click', () => {

  if(!isGlobalCasesMode) {
    changeTableDays();
    isGlobalCasesMode = true;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//count swither right
arrowRightCount.addEventListener('click', () => {

  if(isAllCasesMode) {
    changeTableCount();
    isAllCasesMode = false;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//count swither left
arrowLeftCount.addEventListener('click', () => {

  if(!isAllCasesMode) {
    changeTableCount();
    isAllCasesMode = true;
  }

  cleanTable();
  getInfoTable();
  getCountryInfo();
});

//choose country for table
countries.addEventListener ('click', (event) => {
  cleanTable();
  let target = event.target;
  if (target.className != 'country__name') return;
  currentCountry = target.innerText;
  isCountryMode = true;
  getCountryInfo();
});

//return to total cases
totalBtn.addEventListener ('click', () => {
  isCountryMode = false;
  cleanTable();
  getInfoTable();
})

document.addEventListener ('DOMContentLoaded', () => {
  getInfoTable();
});
