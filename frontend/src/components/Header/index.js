import './index.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar";
import Navigation from '../Navigation';
import bean from '../../assets/bean.png'

const Header = (props) => {

    const styles = {
        A: "bunny-logo",
        B: "center"
    }
    return (
        <div className="header-container">
            <Link to="/" className={`${styles.B}`}><img src={bean} className={`${styles.A}`} alt="logo"/></Link>
            <SearchBar />
            <Navigation />
        </div>
    )
};
export default Header;