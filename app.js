let inputTag = document.getElementById('init')
let photo = document.getElementById('photo');
let span1 = document.getElementById('numb');
let span2 = document.getElementById('deg1');
let weather1 = document.getElementById('weather');
let locat = document.getElementById("ita");
let hum = document.getElementById('numb1');
let deg = document.getElementById('deg2');
let number = document.getElementById('numb3'); 
let sec = document.getElementsByClassName('weather-path');

let currentLuction = document.getElementById('getlocal');
inputTag.addEventListener('keyup',(e) =>{
    if (e.key == 'Enter'&& e.target.value != '') {
        request(e.target.value);
        e.target.value = '';
        
    }
})
const apikey = '6f02a6599be142fa02a402b1df294756';
const request = async (city) =>{
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    let mydata = await fetch(api).then((response) => response.json()).then((data) =>{return data});
    let icon1 = mydata.weather[0].icon
    photo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png"/>`
    locat.innerHTML=`${mydata.name},${mydata.sys.country}`;
    number.innerHTML=`<img src="https://icons-for-free.com/download-icon-humidity+meteorology+rainy+sign+weather+icon-1320196635965713765_512.png" style="height: 7vh;"/>${mydata.main.humidity} % humidity `;
    weather1.innerHTML= `${mydata.weather[0].description}`;
    hum.innerHTML=`<img src="https://play-lh.googleusercontent.com/l0Ah2X-fBGIZtE286Taid95pEwU0lTB5tuH78bh0jXBqH7BSNMZb5wN5fhYyqbG_5Acr=w240-h480-rw" style="height: 7vh;"/>${mydata.main.feels_like.toFixed(0)} C feellike `;
    span1.innerHTML=`${mydata.main.temp.toFixed(0)} C`;
    
 

}
currentLuction.addEventListener('click', () =>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async(locatton) => {
            const lat = locatton.coords.latitude;
            const lon = locatton.coords.longitude;
            const base = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
            let mydata =  await fetch(base).then((response) => response.json()).then((data) =>{return data});
            console.log(mydata)
            let icon1 = mydata.weather[0].icon
            photo.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png"/>`
            locat.innerHTML=`${mydata.name},${mydata.sys.country}`;
            number.innerHTML=`<img src="https://icons-for-free.com/download-icon-humidity+meteorology+rainy+sign+weather+icon-1320196635965713765_512.png" style="height: 7vh;"/>${mydata.main.humidity} % humidity`;
            weather1.innerHTML= `${mydata.weather[0].description}`;
            hum.innerHTML=`<img src="https://play-lh.googleusercontent.com/l0Ah2X-fBGIZtE286Taid95pEwU0lTB5tuH78bh0jXBqH7BSNMZb5wN5fhYyqbG_5Acr=w240-h480-rw" style="height: 7vh;"/>${mydata.main.feels_like.toFixed(0)} C feellike`;
            span1.innerHTML=`${mydata.main.temp.toFixed(0)} C`;

        })
    }

});
