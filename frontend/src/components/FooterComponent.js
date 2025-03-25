// TODO: Style This Component
const FooterComponent = () => {
    return (
        <footer className="bg-red-600 font-press text-xs p-2 text-gray-100">
            {/* Data Source Section */}
            <div>
                <p className="">
                    Data Source: {" "}
                    <a href="https://pokeapi.co/" target="_blank" rel="noreferrer" className="text-yellow-300 hover:text-gray-100 hover:underline transition">
                        PokeAPI
                    </a>
                </p>
            </div>

            {/* Developer Info Section */}
            <div className="flex flex-col md:flex-row justify-evenly items-center gap-2 px-10">
                <p>Developed by: <span className="text-yellow-300">Farhan Hasan</span></p>
                <div className="flex gap-6 sm:gap-4 mt-4 md:mt-0 text-yellow-300">
                    <a className="hover:underline hover:text-gray-100" href="https://github.com/hasanfarhan33/pokemon-web-app" target="_blank" rel="noreferrer">Project Github</a>
                    <a className="hover:underline hover:text-gray-100" href="https://www.linkedin.com/in/farhan-hasan-32baa1176/" target="_blank" rel="noreferrer">LinkedIn</a>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent; 