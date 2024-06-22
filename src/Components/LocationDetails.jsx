import { useContext } from "react";
import { weatherData } from "./WeatherHomePage";
const LocationDetails = () => {
    const { location, details } = useContext(weatherData)
    const imgpath = (imageName) => {
        return new URL(`../assets/Icons/${imageName}.svg`, import.meta.url).href;
    }
    const formatDate = (obj) => {
        return `${obj.hour}:${obj.minute} - ${obj.day} ${obj.date} ${obj.month} ${obj.year}`
    }
    return (
        <>
            <div className="flex items-center gap-4 justify-center lg:justify-start text-white">
                <div>
                    <span className="text-700 sm:text-900">{details.mainInfo.temp}&deg;</span>
                </div>
                <div className="flex justify-start flex-col">
                    <span className="text-300  lg:text-700">{details.mainInfo.city}</span>
                    <span className="text-100 xs:text-200">{formatDate(details.mainInfo.calendar)}</span>
                </div>
                <div className="self-center">
                    <img src={imgpath(details.mainInfo.icon)} alt="climate" className="w-img-size-100  lg:w-img-size-500" />
                </div>
            </div>
        </>
    )
}

export default LocationDetails;