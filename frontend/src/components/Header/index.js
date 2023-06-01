import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar";
import Navigation from '../Navigation';
import bean from '../../assets/bean-logo-black.png'
import SocialLinks from '../SocialLinks/SocialLinks';

const Header = (props) => {

    return (
        <div className="header-container">
            <div>
                <Link to="/" id="app-logo">bean bunny</Link>
                <SocialLinks />
            </div>
            <Navigation />
        </div>
    )
};
export default Header;