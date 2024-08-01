const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
const apiKey = process.env.ACCUWEATHER_API_KEY;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    try {
        const locationUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
        const locationResponse = await axios.get(locationUrl);
        const locationKey = locationResponse.data[0].Key;

        const weatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`;
        const weatherResponse = await axios.get(weatherUrl);

        const hourlyUrl = `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${apiKey}&metric=true`;
        const hourlyResponse = await axios.get(hourlyUrl);

        const dailyUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}&metric=true`;
        const dailyResponse = await axios.get(dailyUrl);

        res.json({
            currentWeather: weatherResponse.data,
            hourlyForecast: hourlyResponse.data,
            dailyForecast: dailyResponse.data.DailyForecasts
        });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
