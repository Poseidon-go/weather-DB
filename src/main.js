const dataWeather = document.getElementById("data-city");
const darkMode = document.querySelector(".darkMode");
const darkModeIcon = document.querySelector(".darkMode i");

async function getForecast(city) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url = `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=${city}&days=7`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    const ErrorE = document.getElementById("Error-Show");
    ErrorE.style.display = "block";
    ErrorE.innerHTML += ` <div id="Error">
      <div id="Error-noti">
        <i class='bx  bx-alert-octagon'></i>
        <p>Rất tiếc, App này méo thấy thành phố mà bạn muốn tìm, xin hãy nhập
          lại</p>
      </div>
      <div id="Error-out">
        <button>Thử lại</button>
      </div>
    </div>`
    console.error('Error:', error.message);
    throw error;
  }
}

async function getWeatherCurrent(city) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const url1 = `https://api.weatherapi.com/v1/marine.json?key=${API_KEY}&q=${city}&days=7`;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    const ErrorE = document.getElementById("Error-Show");
    ErrorE.style.display = "block";
    ErrorE.innerHTML += ` <div id="Error">
      <div id="Error-noti">
        <i class='bx  bx-alert-octagon'></i>
        <p>Rất tiếc, App này méo thấy thành phố mà bạn muốn tìm, xin hãy nhập
          lại</p>
      </div>
      <div id="Error-out">
        <button>Thử lại</button>
      </div>
    </div>`
    console.error('Error:', error.message);
    throw error;
  }
}

async function getFirstData() {
  const weatherTempE = document.getElementById("weather-temp");
  if (!weatherTempE) return;
  const weatherDescriptionE = document.getElementById("weather-description");
  if (!weatherDescriptionE) return;
  const weatherCityE = document.querySelector("#weather-location p");
  if (!weatherCityE) return;
  const weatherDaysE = document.querySelector("#weather-days p");
  if (!weatherDaysE) return;

  const weatherCoutryE = document.querySelector("#weather-country p");
  if (!weatherCoutryE) return;



  const windE = document.querySelector("#detail-wind__main p:last-child ");
  const humidityE = document.querySelector("#detail-Humidity__main p:last-child ");
  const pressureE = document.querySelector("#detail-Pressure__main p:last-child ");
  const visibilityE = document.querySelector("#detail-Visibility__main p:last-child ");
  const sunriseE = document.querySelector("#detail-Sunrise__main p:last-child");
  const sunsetE = document.querySelector("#detail-Sunset__main p:last-child");


  const dataCurrent = await getWeatherCurrent("Ho Chi Minh City");
  const dataForecast = await getForecast("Ho Chi Minh City");
  weatherTempE.innerHTML = `${dataCurrent.current.temp_c}℃`;
  weatherDescriptionE.innerHTML = dataCurrent.current.condition.text;
  // ngày giờ hiện tại
  weatherDaysE.innerHTML = `${dataCurrent.location.localtime}`;
  // thành phố
  weatherCityE.innerHTML = dataCurrent.location.name;
  weatherCoutryE.innerHTML = dataCurrent.location.country;


  windE.innerHTML = `${dataCurrent.current.wind_kph} km/h`;
  humidityE.innerHTML = `${dataCurrent.current.humidity} %`;
  pressureE.innerHTML = `${dataCurrent.current.pressure_mb} hPa`;
  visibilityE.innerHTML = `${dataCurrent.current.vis_km} km`;
  sunriseE.innerHTML = `${dataForecast.forecast.forecastday[0].astro.sunrise}`;
  sunsetE.innerHTML = `${dataForecast.forecast.forecastday[0].astro.sunset}`;
}

getFirstData();


dataWeather.addEventListener("keydown", async (e) => {
  const weatherTempE = document.getElementById("weather-temp");
  const weatherDescriptionE = document.getElementById("weather-description");
  const weatherCityE = document.querySelector("#weather-location p");
  const weatherCoutryE = document.querySelector("#weather-country p");
  const weatherDaysE = document.querySelector("#weather-days p");

  const windE = document.querySelector("#detail-wind__main p:last-child ");
  const humidityE = document.querySelector("#detail-Humidity__main p:last-child ");
  const pressureE = document.querySelector("#detail-Pressure__main p:last-child ");
  const visibilityE = document.querySelector("#detail-Visibility__main p:last-child ");
  const sunriseE = document.querySelector("#detail-Sunrise__main p:last-child");
  const sunsetE = document.querySelector("#detail-Sunset__main p:last-child");
  if (e.key === "Enter") {
    const city = await getWeatherCurrent(e.target.value);
    const dataForeCast = await getForecast(e.target.value);
    weatherTempE.innerHTML = `${city.current.temp_c}℃`;
    weatherDescriptionE.innerHTML = city.current.condition.text;
    weatherCityE.innerHTML = city.location.name;
    weatherDaysE.innerHTML = city.current.last_updated;
    weatherCoutryE.innerHTML = city.location.country;

    windE.innerHTML = `${city.current.wind_kph} km/h`;
    humidityE.innerHTML = `${city.current.humidity} %`;
    pressureE.innerHTML = `${city.current.pressure_mb} hPa`;
    visibilityE.innerHTML = `${city.current.vis_km} km`;
    sunriseE.innerHTML = `${dataForeCast.forecast.forecastday[0].astro.sunrise}`;
    sunsetE.innerHTML = `${dataForeCast.forecast.forecastday[0].astro.sunset}`;
  }
})



// darkMode
darkMode.addEventListener("click", () => {
  const body = document.body;
  const pdHeader = document.querySelector(".pd-header");
  const pdCard = document.querySelector(".pd-card");
  const WeatherTitle = document.querySelector(".Weather-title");



  if (darkModeIcon.className.includes("bx-moon")) {
    darkModeIcon.classList.remove("bx-moon");
    darkModeIcon.classList.add("bx-sun");
    body.style.backgroundColor = 'var(--secondar)';
    WeatherTitle.style.color = 'var(--primary)';
    // pdCard.style.backgroundColor = 'var(--tertiary)';

    const elements = document.querySelectorAll('*');
    elements.forEach(el => {
      const style = getComputedStyle(el);
      if (style.backgroundColor === 'var(--bg-card)') {
        el.style.backgroundColor = 'var(--tertiary)';
      }
    });


  } else {
    darkModeIcon.classList.add("bx-moon");
    darkModeIcon.classList.remove("bx-sun");

    WeatherTitle.style.color = 'var(--textMain)';
    body.style.backgroundColor = 'var(--primary)';
  }
})

