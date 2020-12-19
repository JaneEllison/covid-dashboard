/* eslint-disable no-use-before-define */
const leaflet = window.L;
const covidMap = leaflet.map('mapid').setView([0, 0], 2);

let isCovidInfo = true;
const covidControl = document.querySelector('.map__control');

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileLayerUrl = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png';
const tiles = leaflet.tileLayer(tileLayerUrl, { attribution });
tiles.addTo(covidMap);

const covidData = async () => {
  const response = await fetch('https://corona.lmao.ninja/v2/countries');
  const covidApiData = await response.json();

  const geoFeature = geoCovidMarker(covidApiData);
  createPopupCovid(geoFeature);
};

const geoCovidMarker = (covidApiData) => {
  const geoFormat = {
    type: 'FeatureCollection',
    features: covidApiData.map((element) => {
      const { countryInfo } = element;
      const { lat, long } = countryInfo;

      if (element.cases > 400000 && element.cases < 900000) {
        const covidIcon = createMarkerUi(60, 50);

        leaflet.marker([lat, long], { icon: covidIcon }).addTo(covidMap);
      }
      if (element.cases < 400000) {
        const covidIcon = createMarkerUi(20, 15);

        leaflet.marker([lat, long], { icon: covidIcon }).addTo(covidMap);
      }
      if (element.cases > 900000) {
        const covidIcon = createMarkerUi(100, 90);

        leaflet.marker([lat, long], { icon: covidIcon }).addTo(covidMap);
      }

      const covidGeoInf = {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
        properties: {
          ...element,
        },
      };

      return covidGeoInf;
    }),
  };

  return geoFormat;
};

const createMarkerUi = (width, height) => {
  const covidMarker = leaflet.icon({
    iconUrl: isCovidInfo ? '../assets/images/covid-marker1.png' : '../assets/images/covid-marker2.png',
    iconSize: [width, height],
    iconAnchor: [25, 16],
    className: 'marker_img',
  });

  return covidMarker;
};

const createPopupCovid = (geoFeature) => {
  const geoJsonPoint = new leaflet.GeoJSON(geoFeature, {
    pointToLayer: (covidGeoInf, coordinates) => {
      const { properties } = covidGeoInf;

      const {
        population,
        country,
        cases,
        deaths,
        recovered,
        todayCases,
        todayDeaths,
        todayRecovered,
        casesPerOneMillion,
      } = properties;

      const marker = leaflet.marker(coordinates, {
        icon: leaflet.divIcon({
          className: 'markerPopup',
          html: `${isCovidInfo
            ? `<div class="covid__container">
              <div class="covid__content">
                <h2 class="covid__country">${country}:</h2>
                <div>
                  <span><h3 class="covid__info">Population: ${population} </h3></span>
                  <span><h3 class="covid__info">TotalConfirmed: ${cases} </h3></span>
                  <span><h3 class="covid__info">TotalDeaths: ${deaths}</h3></span>
                  <span><h3 class="covid__info">TotalRecovered: ${recovered}</h3></span>
                </div>
              </div>
            </div>`
            : `<div class="covid__container">
              <div class="covid__content">
                <h2 class="covid__country">${country}:</h2>
                <div>
                  <span><h3 class="covid__info">TodayConfirmed: ${todayCases} </h3></span>
                  <span><h3 class="covid__info">TodayDeaths: ${todayDeaths} </h3></span>
                  <span><h3 class="covid__info">TodayRecovered: ${todayRecovered} </h3></span>
                  <span><h3 class="covid__info">PerOneHundred: ${Math.round(casesPerOneMillion / 10)} </h3></span>
                </div>
              </div>
            </div>`}`,
        }),
        riseOnHover: true,
      });

      return marker;
    },
  });

  geoJsonPoint.addTo(covidMap);
};

const covidControlAction = (event) => {
  if (event.target.getAttribute('class').slice(-7) === 'control') return;
  const markerPopup = document.querySelectorAll('.markerPopup');
  const markerImg = document.querySelectorAll('.marker_img');

  markerImg.forEach((el) => {
    el.remove();
  });
  markerPopup.forEach((el) => {
    el.remove();
  });

  if (event.target.getAttribute('class').slice(-5) === 'total') {
    isCovidInfo = true;
    covidData();
  }

  if (event.target.getAttribute('class').slice(-5) === 'today') {
    isCovidInfo = false;
    covidData();
  }
};

covidControl.addEventListener('click', (event) => covidControlAction(event));

covidData();
