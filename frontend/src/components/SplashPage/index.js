import coffeeBeans from "../../assets/coffee-beans-splash.png"
import "./index.css";

const SplashPage = () => {

    return (
        <div id="splash-root">
            <h1 id="splash-logo">FIND YOUR CUP OF COFFEE</h1>
            <div id="splash-img-container">
                <img src={coffeeBeans} alt="splash-img" id="splash-img"/>
            </div>
        </div>
    );
};

export default SplashPage;