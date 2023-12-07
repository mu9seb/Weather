class CityService {
    
    baseURL = "https://api.weather.gov"

    cities = [
        { name: "New York City", latitude: 40.7128, longitude: -74.0060 },
        { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
        { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
        { name: "Houston", latitude: 29.7604, longitude: -95.3698 },
        { name: "Phoenix", latitude: 33.4484, longitude: -112.0740 },
        { name: "Philadelphia", latitude: 39.9526, longitude: -75.1652 },
        { name: "San Antonio", latitude: 29.4241, longitude: -98.4936 },
        { name: "San Diego", latitude: 32.7157, longitude: -117.1611 },
        { name: "Dallas", latitude: 32.7767, longitude: -96.7970 },
        { name: "San Jose", latitude: 37.3382, longitude: -121.8863 },
        { name: "Austin", latitude: 30.2500, longitude: -97.7500 },
        { name: "Jacksonville", latitude: 30.3322, longitude: -81.6557 },
        { name: "Fort Worth", latitude: 32.7555, longitude: -97.3308 },
        { name: "Columbus", latitude: 39.9612, longitude: -82.9988 },
        { name: "Charlotte", latitude: 35.2271, longitude: -80.8431 },
        { name: "San Francisco", latitude: 37.7749, longitude: -122.4194 },
        { name: "Indianapolis", latitude: 39.7684, longitude: -86.1581 },
        { name: "Seattle", latitude: 47.6062, longitude: -122.3321 },
        { name: "Denver", latitude: 39.7392, longitude: -104.9903 },
        { name: "Washington, D.C.", latitude: 38.8951, longitude: -77.0364 }
      ];
      
    async getAll() {
        return this.cities;
    }
    
    async findByIndex(index) {
        const city = this.cities[index];

        const stationLookupUrl = this.baseURL + `/points/${city.latitude},${city.longitude}`;

        let response = await fetch(stationLookupUrl);
        let data = await response.json();
        let weatherUrl = data.properties.forecast;

        return this.getWeather(weatherUrl);
    }

    async getWeather(Url) {
        let response = await fetch(Url);
        let data = await response.json();
        let forecastArray = data.properties.periods;

        return forecastArray;
    }
      
}