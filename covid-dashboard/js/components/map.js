const leaflet = window.L;
const covidMap = leaflet.map('mapid').setView([0, 0], 2);

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileLayerUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const tiles = leaflet.tileLayer(tileLayerUrl, { attribution });
tiles.addTo(covidMap);

const covidData = async () => {
  const response = await fetch('https://corona.lmao.ninja/v2/countries');
  const covidApiData = await response.json();
};

covidData();
