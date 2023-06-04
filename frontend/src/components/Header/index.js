import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar";
import Navigation from '../Navigation';
import bean from '../../assets/bean-logo-black.png'
import SocialLinks from '../SocialLinks/SocialLinks';
import logo from '../../assets/logo.png'

const Header = (props) => {

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