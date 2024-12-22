const apiKey = "0bea80b4bb945c8bc29d8bee5306ba9f";
const apiBase = "https://api.openweathermap.org/data/2.5/";

const currentWeatherEl = document.getElementById("current-weather");
const hourlyForecastEl = document.getElementById("hourly-forecast-body");
const cityInput = document.getElementById("city-input");
const cityNameEl = document.getElementById("city-name");

let currentCity = "Rivne";
let forecastData = [];

async function fetchWeather(city) {
  try {
    const currentRes = await fetch(
      `${apiBase}weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const currentData = await currentRes.json();

    const lat = currentData.coord.lat;
    const lon = currentData.coord.lon;
    const forecastRes = await fetch(
      `${apiBase}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    forecastData = await forecastRes.json();

    updateCityName(city);
    updateCurrentWeather(currentData);
    updateHourlyForecast(forecastData);
    update5DayForecast(forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("City not found. Please try again.");
  }
}

function updateCityName(city) {
  cityNameEl.textContent = city;
}

function updateCurrentWeather(data) {
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("current-icon").innerHTML = `<img src="${icon}" alt="Weather Icon">`;
  document.getElementById("current-temp").textContent = `${data.main.temp}°C`;
  document.getElementById("current-description").textContent = data.weather[0].description;
  document.getElementById("feels-like").textContent = `${data.main.feels_like}°C`;
  document.getElementById("sunrise").textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  document.getElementById("sunset").textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  const dayLength = (data.sys.sunset - data.sys.sunrise) / 3600;
  document.getElementById("day-length").textContent = `${Math.floor(dayLength)} hours ${Math.round((dayLength % 1) * 60)} minutes`;
}

function updateHourlyForecast(data) {
  hourlyForecastEl.innerHTML = "";
  data.list.slice(0, 8).forEach((item) => {
    const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    const description = item.weather[0].description;
    const temp = item.main.temp;
    const feelsLike = item.main.feels_like;
    const wind = `${item.wind.speed} m/s`;

    const row = `
      <tr>
        <td>${time}</td>
        <td><img src="${icon}" alt="Weather Icon"></td>
        <td>${description}</td>
        <td>${temp}°C</td>
        <td>${feelsLike}°C</td>
        <td>${wind}</td>
      </tr>
    `;
    hourlyForecastEl.innerHTML += row;
  });
}

function update5DayForecast(data) {
    const forecastDaysContainer = document.getElementById("forecast-days");
    forecastDaysContainer.innerHTML = ""; 
  
    data.list.filter((item, index) => index % 8 === 0).forEach((item) => {
      const day = new Date(item.dt * 1000);
      const dayName = day.toLocaleDateString('en-GB', { weekday: 'long' });
      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
      const temp = item.main.temp;
      const description = item.weather[0].description;
  
      const dayCard = `
        <button class="forecast-day" data-day="${day}">
          <h3>${dayName}</h3>
          <img src="${icon}" alt="Weather Icon">
          <p>${temp}°C</p>
          <p>${description}</p>
        </button>
      `;
      forecastDaysContainer.innerHTML += dayCard;
    });
  
    const dayCards = document.querySelectorAll(".forecast-day");
    dayCards.forEach(card => {
      card.addEventListener("click", (event) => {
        const dayClicked = event.target.closest(".forecast-day");
        const dayDate = new Date(dayClicked.getAttribute("data-day"));
        showDailyDetails(dayDate);
      });
    });
  }
  

function showDailyDetails(dayDate) {
  const dayData = forecastData.list.filter(item => {
    const itemDate = new Date(item.dt * 1000);
    return itemDate.toDateString() === dayDate.toDateString();
  });

  const dailyDetails = document.getElementById("daily-details");
  document.getElementById("selected-day-name").textContent = `${dayDate.toDateString()}`;
  dailyDetails.style.display = "block";

  const dailyForecastBody = document.getElementById("daily-forecast-body");
  dailyForecastBody.innerHTML = ""; 
  dayData.forEach(item => {
    const time = new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    const description = item.weather[0].description;
    const temp = item.main.temp;
    const feelsLike = item.main.feels_like;
    const wind = `${item.wind.speed} m/s`;

    const row = `
      <tr>
        <td>${time}</td>
        <td><img src="${icon}" alt="Weather Icon"></td>
        <td>${description}</td>
        <td>${temp}°C</td>
        <td>${feelsLike}°C</td>
        <td>${wind}</td>
      </tr>
    `;
    dailyForecastBody.innerHTML += row;
  });
}

cityInput.addEventListener("change", () => {
  currentCity = cityInput.value;
  fetchWeather(currentCity);
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', (e) => {
    const activeTab = e.target.getAttribute('data-tab');
    if (activeTab === 'today') {
      document.getElementById("today").style.display = "block";
      document.getElementById("forecast").style.display = "none";
      document.querySelector('.tab.active').classList.remove('active');
      e.target.classList.add('active');
    } else {
      document.getElementById("today").style.display = "none";
      document.getElementById("forecast").style.display = "block";
      document.querySelector('.tab.active').classList.remove('active');
      e.target.classList.add('active');
    }
  });
});

fetchWeather(currentCity);