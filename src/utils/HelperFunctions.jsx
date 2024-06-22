const HelperFunctions = () => {

    const getWeatherDetails = async (latitude, longitude) => {
        if (latitude !== null && longitude !== null) {
            const path = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
            const response = await fetch(path);
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    }

    const getWeatherForecast = async (latitude, longitude) => {
        if (latitude !== null && longitude !== null) {
            const path = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_API_KEY}&units=metric&cnt=16`;
            const response = await fetch(path);
            const jsonResponse = await response.json();
            return jsonResponse.list;
        }
    }

    const getLocation = async (location) => {
        const path = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${import.meta.env.VITE_API_KEY}`;
        const response = await fetch(path);
        const [jsonResponse] = await response.json();
        return jsonResponse;
    }

    const weatherTemplate = (weatherDetails, WeatherForecast, searchLocation) => {
        const { name, main, weather, clouds, wind, sys, timezone } = weatherDetails;

        const GMTTime = new Date().getTime();
        const localTime = new Date(GMTTime + timezone * 1000);

        const [day, date, month, year] = localTime.toUTCString().split(" ");
        const hour = localTime.getUTCHours();
        const minute = localTime.getUTCMinutes();

        // for weather forecast follow GMT local
        const GMTHours = new Date().getUTCHours();
        const localGMT = timezone / 3600;

        const forecastIndex =
            getForecastIndex(GMTHours, localGMT) >= 0
                ? getForecastIndex(GMTHours, localGMT)
                : 0;

        function getForecastIndex(GMTHours, localGMT) {
            if (GMTHours % 3 == 0) {
                return Math.floor(localGMT / 3);
            } else if (GMTHours % 3 == 1) {
                return Math.round(localGMT / 3);
            } else if (GMTHours % 3 == 2) {
                return Math.ceil(localGMT / 3);
            }
        }

        function getForecastHour(index) {
            return WeatherForecast[index].dt_txt.split("").slice(11, 13).join("");
        }

        return {
            loading: false,
            weatherMain: weather[0].main,
            mainInfo: {
                temp: Math.round(main.temp),
                calendar: {
                    hour: hour < 10 ? `0${hour}` : `${hour}`,
                    minute: minute < 10 ? `0${minute}` : `${minute}`,
                    day,
                    date,
                    month,
                    year,
                },
                city: searchLocation ? searchLocation.name : name,
                country: searchLocation ? searchLocation.country : sys.country,
                icon: weather[0].icon,
            },
            weatherDetails: {
                desc: weather[0].description || "kakaak",
                tempMax: Math.round(main.temp_max),
                tempMin: Math.round(main.temp_min),
                humidity: main.humidity,
                cloudy: clouds.all,
                wind: Math.round(wind.speed),
            },
            weatherForecast: {
                one: {
                    main: WeatherForecast[forecastIndex].weather[0].main,
                    icon: WeatherForecast[forecastIndex].weather[0].icon,
                    temp: Math.round(WeatherForecast[forecastIndex].main.temp),
                    hour: getForecastHour(forecastIndex),
                },
                two: {
                    main: WeatherForecast[forecastIndex + 1].weather[0].main,
                    icon: WeatherForecast[forecastIndex + 1].weather[0].icon,
                    temp: Math.round(WeatherForecast[forecastIndex + 1].main.temp),
                    hour: getForecastHour(forecastIndex + 1),
                },
                three: {
                    main: WeatherForecast[forecastIndex + 2].weather[0].main,
                    icon: WeatherForecast[forecastIndex + 2].weather[0].icon,
                    temp: Math.round(WeatherForecast[forecastIndex + 2].main.temp),
                    hour: getForecastHour(forecastIndex + 2),
                },
                four: {
                    main: WeatherForecast[forecastIndex + 3].weather[0].main,
                    icon: WeatherForecast[forecastIndex + 3].weather[0].icon,
                    temp: Math.round(WeatherForecast[forecastIndex + 3].main.temp),
                    hour: getForecastHour(forecastIndex + 3),
                },
                five: {
                    main: WeatherForecast[forecastIndex + 4].weather[0].main,
                    icon: WeatherForecast[forecastIndex + 4].weather[0].icon,
                    temp: Math.round(WeatherForecast[forecastIndex + 4].main.temp),
                    hour: getForecastHour(forecastIndex + 4),
                },
            },
        };
    }

    return { getLocation, getWeatherDetails, getWeatherForecast, weatherTemplate }
}
export default HelperFunctions;