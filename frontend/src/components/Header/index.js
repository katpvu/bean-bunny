import './index.css'
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../SearchBar";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";

const Header = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
            // .then(console.log("logging out"))
            .then(history.push("/login"))
    }
    return (
        <div className="header-container">
            <Link to="/"><h1 id="bunny-logo">Bean Bunny Logo</h1></Link>
            <SearchBar />
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
};
export default Header;