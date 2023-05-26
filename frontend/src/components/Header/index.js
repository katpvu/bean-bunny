import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar";
import Navigation from '../Navigation';
import bean from '../../assets/bean-logo-black.png'

const Header = (props) => {

    return (
        <div className="header-container">
            <Link to="/" id="app-logo">bean bunny</Link>
            <Navigation />
        </div>
    )
};
export default Header;