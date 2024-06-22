import { list } from "postcss";
import { useState, useContext, useEffect } from "react";
import { weatherData } from "./WeatherHomePage";
import Loader from "./Loader";
const ForecastDetails = () => {
    const { details } = useContext(weatherData)
    const [forecastData, setForecastDetails] = useState([])
    const sortForecastDetails = () => {
        const keys = Object.keys(details.weatherForecast)
        const resultant = keys.sort()
        const mapping = {
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5
        };
        return resultant.sort((a, b) => mapping[a] - mapping[b]).map(key => { return details.weatherForecast[key] })
    }

    useEffect(() => {
        const ForecastDetails = sortForecastDetails();
        setForecastDetails(ForecastDetails)
    }, [details])

    const imgpath = (imageName) => {
        return new URL(`../assets/Icons/${imageName}.svg`, import.meta.url).href;
    }
    function convertTo12HourFormat(hour) {
        let suffix = hour >= 12 ? 'PM' : 'AM';
        let hour12 = hour % 12;
        hour12 = hour12 ? hour12 : 12;
        return `${hour12}:00 ${suffix}`;
    }
    return (
        <>
            <div>
                <div className="py-4 my-6">
                    <span>Wheather Forecast</span>
                </div>
                <div className="mt-8">
                    <ul>
                        {forecastData.length > 0 && (
                            forecastData.map((obj, index) => (
                                <li key={index} className="flex py-4 justify-between items-center">
                                    <div className="flex gap-4 items-center">
                                        <img src={imgpath(obj.icon)} alt="alt" />
                                        <div className="flex flex-col">
                                            <span>{convertTo12HourFormat(obj.hour)}</span>
                                            <span>{obj.main}</span>
                                        </div>
                                    </div>
                                    <div><span>{obj.temp}&deg;</span></div>
                                </li>
                            ))

                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ForecastDetails;