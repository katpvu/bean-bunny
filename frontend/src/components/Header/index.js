import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar";

import Navigation from '../Navigation';

const Header = (props) => {



    return (
        <div className="header-container">
            <Link to="/"><h1 id="bunny-logo">Bean Bunny Logo</h1></Link>
            <SearchBar />
            <Navigation />
            
        </div>
    )
};
export default Header;