import Search from "./Search"
const HeaderComponent = () => {
    return (
        <>
            <div className="flex flex-col items-center lg:flex-row justify-between text-white">
                <div className="text-2xl pt-8">
                    <span>Forecast Channel</span>
                </div>
                <div className="my-5 lg:my-0 lg:hidden">
                    <Search />
                </div>

            </div>
        </>
    )
}
export default HeaderComponent;