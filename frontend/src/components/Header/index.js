import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from '../Navigation';
import SocialLinks from '../SocialLinks/SocialLinks';
import logo from '../../assets/logo.png'

const Header = () => {
    return (
        <div className="header-container">
            <div>
                <Link to="/" id="app-logo"><img id="logo" src={logo} alt="logo" /></Link>
                <SocialLinks />
            </div>
            <Navigation />
        </div>
    )
};
export default Header;