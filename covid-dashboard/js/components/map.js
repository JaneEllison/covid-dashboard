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

covidData();
