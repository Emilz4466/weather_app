const api = {
    key: "5d241274257c3ef0e6f3f6daec3f48a0",
    baseurl:"https://api.openweathermap.org/data/2.5/"
}

const icon = {
    baseurl:"http://openweathermap.org/img/w/",
    code: 0,
    extension: ".png"

}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function startApp(){
    document.querySelector('.start-icon').style.display ="none";
    document.querySelector('.wrapper').style.display ="flex";
}

function setQuery(evt){
    if(evt.keyCode == 13){
            getResult(searchbox.value);
            console.log(searchbox.value);
            document.querySelector('header input').value = '';
            document.querySelectorAll('.inf').forEach(
                el=>{
                    el.style.display = "block";
                }
            );
            document.querySelector('.error').style.display= "none";
            document.querySelector('header input').style.border = "none";
    }
}

function getResult (query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&lang=pl&APPID=${api.key}`)
    .then(weather => weather.json())
    .then(displayResult);
}

function displayResult (weather){

    console.log(weather);

    if(weather.cod == 404){
        document.querySelector('.error').style = "display: block;";
        document.querySelector('header input').style = "border: red solid;";
    }

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current-weather .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weatherIcon = document.querySelector(".current-weather .weather-icon");
    weatherIcon.innerHTML =  `<img src="${icon.baseurl}${weather.weather[0].icon}${icon.extension}". style = "width:100px; height:100px;">`;

    let weatherEl = document.querySelector('.current-weather .weather');
    weatherEl.innerText = weather.weather[0].main;

    let weatherWind = document.querySelector('.current-weather .wind');
    weatherWind.innerHTML = `${weather.wind.speed}${" m/s"}`;

    let press = document.querySelector('.current-weather .pressure');
    press.innerHTML = `${weather.main.pressure}${" hPa"}`;

    let hum = document.querySelector('.current-weather .humidity');
    hum.innerHTML = `${weather.main.humidity}${" %"}`;

}

function dateBuilder (d) {
    let months = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
    let days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
}