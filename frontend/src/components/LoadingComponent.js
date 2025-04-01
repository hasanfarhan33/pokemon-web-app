import * as motion from "motion/react-client"
import vaultImage from "../assets/pokeVault.png"

const LoadingComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-press">
            <motion.img src={vaultImage} alt="Loading..." className="w-32 h-32" animate={{rotate: 360}} transition={{repeat: Infinity, duration: 1, ease: "easeIn"}}></motion.img>
            <motion.p 
                className="mt-4 text-red-600 font-bold text-lg"
                animate= {{opacity: [0,1,0]}}
                transition={{repeat: Infinity, duration: 1.5, ease: "easeInOut"}}
            >
                Loading...
            </motion.p>
        </div>
    )
}

export default LoadingComponent; 