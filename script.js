document.getElementById("searchBtn").addEventListener("click", function () {
  const city = document.querySelector(".search-bar input").value.trim();
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  fetchWeather(city);
});

var inputBox = document.querySelector(".search-bar input");

inputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    var city = inputBox.value.trim();

    if (city === "") {
      alert("Please enter a city name");
      return;
    }

    fetchWeather(city);
  }
});

// Fetch weather data from the API
function fetchWeather(city) {
  //API key
  var apiKey = "e0d63cfad1e836b0b4d0e101b20aa685";

  // API using the city name
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    encodeURIComponent(city) +
    "&units=metric&appid=" +
    apiKey;

  fetch(apiUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("City not found");
      }

      return response.json();
    })
    .then(function (data) {
      updateWeatherUI(data);
    })
    .catch(function (error) {
      alert(error.message);
    });
}

// Update web page with weather data
function updateWeatherUI(data) {
  // Temperature
  var tempElement = document.querySelector(".temperature h2");
  tempElement.textContent = data.main.temp.toFixed(2) + "°";

  // Weather des
  var descElement = document.querySelector(".temperature p");
  descElement.textContent = data.weather[0].description;

  // Weather icon
  var iconElement = document.querySelector(".temperature img");
  iconElement.src =
    "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
  iconElement.alt = data.weather[0].description;

  // Wind Speed
  var windElement = document.querySelector(".bottom-left-bar p:nth-child(1)");
  windElement.innerHTML = "<strong>Wind:</strong> " + data.wind.speed + " m/s";

  // Humidity
  var humidityElement = document.querySelector(
    ".bottom-left-bar p:nth-child(2)"
  );
  humidityElement.innerHTML =
    "<strong>Humidity:</strong> " + data.main.humidity + "%";

  // Pressure
  var pressureElement = document.querySelector(
    ".bottom-right-bar p:nth-child(1)"
  );
  pressureElement.innerHTML =
    "<strong>Pressure:</strong> " + data.main.pressure + " hPa";

  // Cloudiness
  var cloudsElement = document.querySelector(
    ".bottom-right-bar p:nth-child(2)"
  );
  cloudsElement.innerHTML =
    "<strong>Cloudiness:</strong> " + data.clouds.all + "%";
}
