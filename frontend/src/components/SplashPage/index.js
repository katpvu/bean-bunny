import { useDispatch } from "react-redux";
import coffeeBeans from "../../assets/coffee-beans-splash.png"
import "./index.css";
import { useEffect } from "react";
import { restoreSession } from "../../store/session";

const SplashPage = () => {

    const dispatch = useDispatch();
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    useEffect(() => {
        dispatch(restoreSession())
    }, [dispatch])

    

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