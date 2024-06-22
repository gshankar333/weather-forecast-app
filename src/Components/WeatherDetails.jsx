import Search from "./Search";
import ClimateDetails from "./ClimateDetails";
import ForecastDetails from "./ForecastDetails";
const WeatherDetails = () => {
    return (
        <>
            <div className=" lg:border-l-2 p-8 bg-transparent backdrop-blur-xl w-[90%] h-[100vh] m-auto lg:w-[30%] lg:m-0 text-300 text-white overflow-y-auto scrollbar-hide">
                <div className="hidden lg:block">
                    <Search />
                </div>
                <div>
                    <h5 className="mt-6 mb-9 font-bold">Weather Details</h5>
                    <ClimateDetails />
                    <ForecastDetails />
                </div>
            </div>
        </>
    )
}

export default WeatherDetails;