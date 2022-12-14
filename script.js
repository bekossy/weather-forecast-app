const openWeatherApi = "3d59a6cbbbad8955c5abd31417471e0d";
const openUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
const info = document.querySelector(".info");
const empty = document.querySelector(".empty");
const card = document.querySelector(".card");
const form = document.querySelector(".location");
let state = {};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = form.city.value.trim();
  form.reset();

  const httpRequest = new XMLHttpRequest();
  httpRequest.addEventListener("readystatechange", () => {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        successUI(httpRequest.responseText);
      } else {
        errorUI();
      }
    }
  });
  httpRequest.open("GET", openUrl + location + "&appid=" + openWeatherApi);
  httpRequest.send();
});

function successUI(data) {
  const parsed = JSON.parse(data);
  state = {
    desc: parsed.weather[0].description,
    icon: parsed.weather[0].icon,
    name: parsed.name,
    time: parsed.dt,
    temp: parsed.main.temp,
  };

  var degC = state.temp - 273.15;
  var degCInt = Math.floor(degC);
  var degF = degC * 1.8 + 32;
  var degFInt = Math.floor(degF);
  const time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  const day = "./Time/day.svg";
  const night = "./Time/night.svg";
  let lightTime = "";
  if (time.getHours() >= 5 || time.getHours() <= 18) {
    lightTime = day;
    document.body.style.background = "linear-gradient(1deg, white, #6390bd)";
  }
  if (time.getHours() > 18 || time.getHours() <= 4) {
    lightTime = night;
    document.body.style.background = "linear-gradient(1deg, black, #072849);";
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  card.innerHTML = `
    <img src=${lightTime} alt="">

    <div class="icon">
        <img src="http://openweathermap.org/img/w/${state.icon}.png" alt="${state.name} weather icon">
    </div>

    <div class="info">
        <h2>${state.name}</h2>
        <div>${state.desc}</div>
        <div>Time: <b>${hour}:${min}</b></div>                

        <div class="temp">
            <span>${degCInt} &deg;C</span> /
            <span>${degFInt} &deg;F</span>
        </div>
    </div>
    `;

  card.style.display = "block";
  empty.style.display = "none";
}

function errorUI() {
  document.body.style.background = "#a3a3a3";
  empty.style.display = "block";
  card.style.display = "none";
}
