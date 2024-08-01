# Weather Forecast App

## Overview
The Weather Forecast App lets users search for weather information for any city. It shows current weather, hourly forecasts, and daily forecasts using the AccuWeather API.

## Use Case

### **Actors**
- **User**: The person using the app to check the weather.

### **Before You Start**
- You need an internet connection.
- You need a working API key for AccuWeather.
- The app should be running properly.

### **Main Steps**
1. **Open the App**:
   - The user opens the app in a web browser.

2. **Search for Weather**:
   - The user types a city name into the search box and clicks the button to search.

3. **App Processes the Request**:
   - The frontend sends the city name to the backend server.

4. **Fetch Weather Data**:
   - The backend server gets the city’s location key from AccuWeather.
   - It then fetches current weather, hourly forecast, and daily forecast data using this key.

5. **Send Data Back to Frontend**:
   - The backend sends the weather data back to the frontend.

6. **Display Weather Information**:
   - The frontend shows the current weather, hourly forecast, and daily forecast to the user.

7. **User Sees Weather Info**:
   - The user views the current temperature, weather description, and forecasts.

### **Alternative Scenarios**
- **City Not Found**:
  - If the city isn’t found, the backend sends an error message.
  - The frontend shows an error message to the user.

- **API Error**:
  - If there’s a problem with the API, the backend sends an error message.
  - The frontend shows a general error message.

- **Invalid Input**:
  - If the user types invalid data, the frontend asks for a valid city name.

### **After the Search**
- The user gets the weather information they searched for.
- If the search was successful, data is shown; if not, an error message appears.

### **User Interface**
- **Search Box**: Where users type the city name.
- **Current Weather**: Shows the current temperature and weather condition with an icon.
- **Hourly Forecast**: Shows weather info for the next 12 hours.
- **Daily Forecast**: Shows weather info for the next 5 days.

### **System Needs**
- **Frontend**:
  - HTML/CSS for the layout and design.
  - JavaScript (or React) for interaction and API calls.
- **Backend**:
  - Node.js with Express to handle API requests.
  - Connects to the AccuWeather API.
- **API**:
  - AccuWeather for weather data.
- **Styling**:
  - Use custom CSS for a responsive design.

### **Assumptions and Limitations**
- **Assumptions**:
  - The API key is valid and has enough usage limits.
  - The AccuWeather API is working and provides accurate data.
- **Limitations**:
  - The app depends on AccuWeather’s data and availability.
  - The app might not handle all possible errors from the API.
