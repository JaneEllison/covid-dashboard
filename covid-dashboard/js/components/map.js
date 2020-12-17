const leaflet = window.L;
const covidMap = leaflet.map('mapid').setView([0, 0], 2);

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

      if (element.cases > 400000 && element.cases < 700000) {
        const covidIcon = createMarkerUi(50, 30);

        leaflet.marker([lat, long], { icon: covidIcon }).addTo(covidMap);
      }
      if (element.cases < 400000) {
        const covidIcon = createMarkerUi(20, 15);

        leaflet.marker([lat, long], { icon: covidIcon }).addTo(covidMap);
      }
      if (element.cases > 700000) {
        const covidIcon = createMarkerUi(70, 60);

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
    iconUrl: '../assets/images/covid-marker.png',
    iconSize: [width, height],
    iconAnchor: [25, 16],
  });

  return covidMarker;
};

const createPopupCovid = (geoFeature) => {
  const geoJsonPoint = new leaflet.GeoJSON(geoFeature, {
    pointToLayer: (covidGeoInf, coordinates) => {
      const { properties } = covidGeoInf;

      const {
        country, cases, deaths, recovered,
      } = properties;

      const marker = leaflet.marker(coordinates, {
        icon: leaflet.divIcon({
          className: 'icon',
          html: `
            <div class="covid__container">
              <div class="covid__content">
                <h2 class="covid__country">${country}:</h2>
                <div>
                  <span><h3 class="covid__info">TotalConfirmed: ${cases}</h3></span>
                  <span><h3 class="covid__info">TotalDeaths: ${deaths}</h3></span>
                  <span><h3 class="covid__info">TotalRecovered: ${recovered}</h3></span>
                </div>
              </div>
            </div>
          `,
        }),
        riseOnHover: true,
      });

      return marker;
    },
  });

  geoJsonPoint.addTo(covidMap);
};

covidData();
