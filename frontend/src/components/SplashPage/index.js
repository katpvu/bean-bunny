import coffeeShopBg from '../../assets/grained-building.jpg'
import friends from '../../assets/friends.png'
import coffeeStand from '../../assets/coffee-stand.png'
import keepingTrack from '../../assets/keeping-track.png'
import beanLogo from '../../assets/bean-bunny-splash-logo.png'
import Flickity from 'react-flickity-component'
import { useHistory} from "react-router-dom/cjs/react-router-dom.min";

import "./index.css"
const SplashPage = ({eHandler}) => {
    const history = useHistory();
    return (
        <> 
            <div className="splash-page-container">
                <div className="background-container">
                    <img src={coffeeShopBg} />
                    <div className="splash-overlay"></div>
                </div>

                <div className="splash-contents">
                    <img src={beanLogo} />
                    {/* <Flickity className={'splash-cards-container'}>
                        <div className="splash-cards">
                            <img src={coffeeStand} />
                            <h2>DISCOVER</h2>
                            <p>Explore top rated coffee shops found in a given location.</p>
                        </div>
                        <div className="splash-cards">
                            <img src={keepingTrack} />
                            <h2>ORGANIZE</h2>
                            <p>Keep track of your favorite coffee shops and ones that you want to try!</p>

                        </div>
                        <div className="splash-cards">
                        <img src={friends} />
                            <h2>SHARE</h2>
                            <p>Connect with others and read up on their thoughts on a coffee shop!</p>
                        </div>
                    </Flickity> */}
                    <div className="splash-cards-container">
                        <div className="splash-cards">
                            <img src={coffeeStand} />
                            <h2>DISCOVER</h2>
                            <p>Explore top rated coffee shops found in a given location.</p>

                        </div>
                        <div className="splash-cards">
                            <img src={keepingTrack} />
                            <h2>ORGANIZE</h2>
                            <p>Keep track of your favorite coffee shops and ones that you want to try!</p>

                        </div>
                        <div className="splash-cards">
                        <img src={friends} />
                            <h2>SHARE</h2>
                            <p>Connect with others and read up on their thoughts on a coffee shop!</p>
                        </div>
                    </div>
                    <p>Start your day with a brew-tiful cup of coffee!</p>
                    <div className="get-started-btn" onClick={eHandler.onGetStarted}>Get Started</div>
                </div>
            </div>
        </>
    )
}
export default SplashPage;