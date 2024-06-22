import { useContext, useEffect, useMemo, useState } from "react";
import { weatherData } from "./WeatherHomePage";
// import Helper from "../utils/Helper";
import HelperFunctions from "../utils/HelperFunctions";
import ClimateImages from "../utils/ClimateImages";
const ClimateDetails = () => {
    const { location, details } = useContext(weatherData)
    const { maxTemp, minTemp, humidity, cloudy, windy } = ClimateImages();

    return (
        <>
            <div className=" border-b-2 border-white">
                <div className="mb-4 mt-8">
                    <span className="my-4 font-medium">{details.weatherDetails.desc.toUpperCase()}</span>
                </div>
                <div className="mb-8 mt-4">
                    <ul className="climateDetails mb-4">
                        <li>
                            <span>Temp max</span>
                            <div>
                                <span>{details.weatherDetails.tempMax}&deg;</span>
                                <span><img src={maxTemp} alt="maxTemp" /></span>
                            </div>
                        </li>
                        <li>
                            <span>Temp min</span>
                            <div>
                                <span>{details.weatherDetails.tempMin}&deg;</span>
                                <span><img src={minTemp} alt="minTemp" /></span>
                            </div>
                        </li>
                        <li>
                            <span>Humidity</span>
                            <div>
                                <span>{details.weatherDetails.humidity}&#37;</span>
                                <span><img src={humidity} alt="humidity" /></span>
                            </div>
                        </li>
                        <li>
                            <span>cloudy</span>
                            <div>
                                <span>{details.weatherDetails.cloudy}&#37;</span>
                                <span><img src={cloudy} alt="cloudy" /></span>
                            </div>
                        </li>
                        <li>
                            <span>windy</span>
                            <div>
                                <span>{details.weatherDetails.wind}km/hr</span>
                                <span><img src={windy} alt="windy" /></span>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )
}

export default ClimateDetails;