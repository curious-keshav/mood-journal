import { API_KEY } from "../constants/apiKey";

// const dummyRes= {
//     "request": {
//         "type": "LatLon",
//         "query": "Lat 12.91 and Lon 77.63",
//         "language": "en",
//         "unit": "m"
//     },
//     "location": {
//         "name": "Bangalore",
//         "country": "India",
//         "region": "Karnataka",
//         "lat": "12.983",
//         "lon": "77.583",
//         "timezone_id": "Asia/Kolkata",
//         "localtime": "2025-04-22 16:20",
//         "localtime_epoch": 1745338800,
//         "utc_offset": "5.50"
//     },
//     "current": {
//         "observation_time": "10:50 AM",
//         "temperature": 34,
//         "weather_code": 113,
//         "weather_icons": [
//             "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
//         ],
//         "weather_descriptions": [
//             "Sunny"
//         ],
//         "astro": {
//             "sunrise": "06:03 AM",
//             "sunset": "06:33 PM",
//             "moonrise": "01:40 AM",
//             "moonset": "01:24 PM",
//             "moon_phase": "Waning Crescent",
//             "moon_illumination": 40
//         },
//         "air_quality": {
//             "co": "529.1",
//             "no2": "7.03",
//             "o3": "156",
//             "so2": "14.245",
//             "pm2_5": "46.99",
//             "pm10": "94.535",
//             "us-epa-index": "3",
//             "gb-defra-index": "3"
//         },
//         "wind_speed": 24,
//         "wind_degree": 91,
//         "wind_dir": "E",
//         "pressure": 1013,
//         "precip": 0,
//         "humidity": 28,
//         "cloudcover": 25,
//         "feelslike": 32,
//         "uv_index": 2,
//         "visibility": 8,
//         "is_day": "yes"
//     }
// }

export const fetchWeather = async (lat, lon) => {
  
    const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lon}&units=m`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      // const data = dummyRes;
  
      if (data.error) {
        throw new Error(data.error.info || 'Weatherstack API error');
      }
  
      return {
        temperature: data.current.temperature,
        description: data.current.weather_descriptions[0],
        icon: data.current.weather_icons[0],
        humidity: data.current.humidity,
        wind_speed: data.current.wind_speed,
        city: data.location.name,
        country: data.location.country,
      };
    } catch (error) {
      console.error('Weather fetch error:', error);
      return null;
    }
  };
  