const inputTag = document.getElementById('init');
const photo = document.getElementById('photo');
const temp = document.getElementById('numb');
const weather1 = document.getElementById('weather');
const locations = document.getElementById('ita');
const humidity = document.getElementById('numb1');
const number = document.getElementById('numb3');
const currentLuction = document.getElementById('getlocal');

const apikey = '6f02a6599be142fa02a402b1df294756';
/**
 * request will fecth the data from open weather and display the content in the ui
 * @param {name} city=has an coundry code
 */
const request = async (city) => {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
  const mydata = await fetch(api).then((response) => response.json()).then((data) => data);
  const icon1 = mydata.weather[0].icon;
  photo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png"/>`;
  locations.innerHTML = `${mydata.name},${mydata.sys.country}`;
  number.innerHTML = `${mydata.main.humidity} %`;
  weather1.innerHTML = `${mydata.weather[0].description}`;
  humidity.innerHTML = `${mydata.main.feels_like.toFixed(0)} C`;
  temp.innerHTML = `${mydata.main.temp.toFixed(0)} C`;
  inputTag.value = ' ';
};

inputTag.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && e.target.value !== '') {
    request(e.target.value);
  }
});
/**
 * This will fecth the data with longitude latitude
 *  and display the current location data in the ui
*/
currentLuction.addEventListener('click', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (location) => {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
      const mydata = await fetch(base).then((response) => response.json()).then((data) => data);
      const icon1 = mydata.weather[0].icon;
      photo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png"/>`;
      locations.innerHTML = `${mydata.name},${mydata.sys.country}`;
      number.innerHTML = `${mydata.main.humidity} %`;
      weather1.innerHTML = `${mydata.weather[0].description}`;
      humidity.innerHTML = `${mydata.main.feels_like.toFixed(0)} C`;
      temp.innerHTML = `${mydata.main.temp.toFixed(0)} C`;
    });
  }
});
