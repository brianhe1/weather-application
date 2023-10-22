/* variables */
const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-btn");
const error = document.getElementById("error");
const weatherContainer = document.getElementById("weather-container");
const fullWeatherContainer = document.getElementById("full-weather-container");

const apiKey = "8723fe12931330efb90a092848ff9bba";

function fetchWeatherData() {
    const city = searchBar.value.trim();  // store inputted city into city variable
    // if city is empty, function returns and does not execute followin code
    if (city === "") {
        return;
    }
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
    .then(response => response.json())  // convert response body into JSON format
    .then(data => {
        if (data.cod === '404') {  // if city not found in API response, add/remove class and return
            error.classList.remove("hidden");
            weatherContainer.classList.add("hidden");
            fullWeatherContainer.classList.add("bg-gradient-to-r", "from-sky-500", "to-indigo-500");
            fullWeatherContainer.classList.remove("bg-day-time", "bg-cover", "bg-center");
            fullWeatherContainer.classList.remove("bg-night-time", "bg-cover", "bg-center");
            return;
        }
        // city found, add/remove class
        error.classList.add("hidden");
        weatherContainer.classList.remove("hidden");
        fullWeatherContainer.classList.remove("bg-gradient-to-r", "from-sky-500", "to-indigo-500");
        fullWeatherContainer.classList.remove("bg-day-time", "bg-cover", "bg-center");
        fullWeatherContainer.classList.remove("bg-night-time", "bg-cover", "bg-center");

        const cityName = data.name;
        const description = data.weather[0].description;
        const descriptionWords = description.split(" ");
        const capitalizedWords = descriptionWords.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        const formattedDescription = capitalizedWords.join(" ");
        const icon = data.weather[0].icon;
        const temperature = Math.round(data.main.temp);
        const feelsTemperature = Math.round(data.main.feels_like);
        const humidity = data.main.humidity;
        const windSpeed = Math.round(data.wind.speed);

        const currentTime = Math.floor(Date.now() / 1000);  // get current timestamp (in seconds since UNIX epoch)
        const sunriseTime = data.sys.sunrise;
        const sunsetTime = data.sys.sunset;

        // Compare the current time with the sunrise and sunset times
        if (currentTime >= sunriseTime && currentTime <= sunsetTime) {
            fullWeatherContainer.classList.add("bg-day-time", "bg-cover", "bg-center");
            console.log("The sun is up.");
        } else {
            console.log("The sun is down.");
            fullWeatherContainer.classList.add("bg-night-time", "bg-cover", "bg-center");
        }

        document.getElementById("temp").innerText = `${temperature}°F`;
        document.getElementById("description-and-location").innerText = `${formattedDescription} | ${cityName}`;
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.getElementById("feels-like").innerText = `${feelsTemperature}°F`;
        document.getElementById("humidity").innerText = `${humidity}%`;
        document.getElementById("wind").innerText = `${windSpeed}`;
    })
}

// Event listener for the search button click
searchButton.addEventListener("click", fetchWeatherData);

// Event listener for the Enter key press on the search input
searchBar.addEventListener("keypress", event => {
    if (event.key === "Enter") {
      fetchWeatherData();
    }
});