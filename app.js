document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "5EEfHmd8WXSpYSHhQAtWT2G6f8RfoSnq"; // Replace with your actual API key
    const form = document.getElementById("cityForm");
    const currentWeatherDiv = document.getElementById("currentWeather");
    const hourlyForecastDiv = document.getElementById("hourlyForecast");
    const dailyForecastDiv = document.getElementById("dailyForecast");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const city = document.getElementById("cityInput").value;
        getWeather(city);
    });

    function getWeather(city) {
        const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;

        fetch(locationUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const locationKey = data[0].Key;
                    fetchWeatherData(locationKey);
                    fetchHourlyForecast(locationKey);
                    fetchDailyForecast(locationKey);
                } else {
                    displayError("City not found.");
                }
            })
            .catch(error => {
                console.error("Error fetching location data:", error);
                displayError("Error fetching location data.");
            });
    }

    function fetchWeatherData(locationKey) {
        const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    displayCurrentWeather(data[0]);
                } else {
                    displayError("No weather data available.");
                }
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
                displayError("Error fetching weather data.");
            });
    }

    function fetchHourlyForecast(locationKey) {
        const hourlyUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}&metric=true`;

        fetch(hourlyUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    displayHourlyForecast(data);
                } else {
                    displayError("No hourly forecast data available.");
                }
            })
            .catch(error => {
                console.error("Error fetching hourly forecast data:", error);
                displayError("Error fetching hourly forecast data.");
            });
    }

    function fetchDailyForecast(locationKey) {
        const dailyUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`;

        fetch(dailyUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.DailyForecasts && data.DailyForecasts.length > 0) {
                    displayDailyForecast(data.DailyForecasts);
                } else {
                    displayError("No daily forecast data available.");
                }
            })
            .catch(error => {
                console.error("Error fetching daily forecast data:", error);
                displayError("Error fetching daily forecast data.");
            });
    }

    function displayCurrentWeather(data) {
        const temperature = data.Temperature.Metric.Value;
        const weather = data.WeatherText;
        const weatherIcon = data.WeatherIcon;

        const weatherContent = `
            <h2>Current Weather</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${weather}</p>
            <img src="https://developer.accuweather.com/sites/default/files/${weatherIcon < 10 ? '0' + weatherIcon : weatherIcon}-s.png" alt="${weather}" />
        `;
        currentWeatherDiv.innerHTML = weatherContent;
    }

    function displayHourlyForecast(data) {
        const hourlyContent = data.map(hour => `
            <div class="hourly-card">
                <p class="hour">${new Date(hour.DateTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                <img src="https://developer.accuweather.com/sites/default/files/${hour.WeatherIcon < 10 ? '0' + hour.WeatherIcon : hour.WeatherIcon}-s.png" alt="${hour.IconPhrase}" />
                <p class="temperature">${hour.Temperature.Value}°C</p>
                <p class="phrase">${hour.IconPhrase}</p>
            </div>
        `).join('');
        hourlyForecastDiv.innerHTML = `
            <header><h2>Hourly Forecast</h2></header>
            <div class="forecast-cards horizontal">${hourlyContent}</div>
        `;
    }

    function displayDailyForecast(data) {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dailyContent = data.map(day => {
            const dayOfWeek = daysOfWeek[new Date(day.Date).getDay()];
            return `
                <div class="forecast-card">
                    <p>${dayOfWeek}<br>
                    High ${day.Temperature.Maximum.Value}°C, Low ${day.Temperature.Minimum.Value}°C</p>
                    <img src="https://developer.accuweather.com/sites/default/files/${day.Day.Icon < 10 ? '0' + day.Day.Icon : day.Day.Icon}-s.png" alt="${day.Day.IconPhrase}" />
                    <p>${day.Day.IconPhrase}</p>
                </div>
            `;
        }).join('');
        dailyForecastDiv.innerHTML = `
            <header><h2>Daily Forecast</h2></header>
            <div class="forecast-cards vertical">${dailyContent}</div>
        `;
    }

    function displayError(message) {
        currentWeatherDiv.innerHTML = `<p>${message}</p>`;
        hourlyForecastDiv.innerHTML = '';
        dailyForecastDiv.innerHTML = '';
    }
});
