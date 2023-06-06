
import { useSelector } from "react-redux";
import './index.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {  useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { NavLink } from "react-router-dom";
import './index.css'
import { clearBusinesses } from "../../store/business";
import { clearSearches } from "../../store/search";
import { clearLists } from "../../store/list";
import { clearListItems } from "../../store/list_items";
import { clearRatings } from "../../store/ratings";
import { useState, useEffect } from "react";
import { GiHamburgerMenu } from 'react-icons/gi'
import NavPanel from "./NavPanel";

const Navigation = (props) => {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [openNavPanel, setOpenNavPanel] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
            .then(() => history.push("/login"))
            .then(() => {
                dispatch(clearBusinesses());
                dispatch(clearSearches());
                dispatch(clearLists());
                dispatch(clearListItems());
                dispatch(clearRatings());
            });
    };

    const sessionLinks = () => {
        if (sessionUser) {
            return (
                <>
                <li onClick={() => setOpenNavPanel(false)}>
                    <NavLink to="/search">search</NavLink>
                </li>
                <li onClick={() => setOpenNavPanel(false)}>
                    <NavLink to="/hopped">hopped</NavLink>
                </li>
                <li onClick={() => setOpenNavPanel(false)}>
                    <NavLink to="/lists">collections</NavLink>
                </li>
                <li onClick={() => setOpenNavPanel(false)}>
                    <div 
                        onClick={handleLogout}
                        className="logout-btn">
                            <FontAwesomeIcon icon={faRightFromBracket} 
                            className="icon"/>
                                logout
                    </div>
                </li>
                </>
            )
        } else if (!sessionUser) {
            return (
                <>
                <li onClick={() => setOpenNavPanel(false)}>
                    <NavLink to="/search">search</NavLink>
                </li>
                <li onClick={() => setOpenNavPanel(false)}>
                    <NavLink to="/login">login</NavLink>
                </li>
                <li onClick={() => setOpenNavPanel(false)}>
                    <NavLink to="/signup">signup</NavLink>
                </li>
                </>
            )
        }
    }

    return (
    <>
    <ul className="nav-container">
        {sessionLinks()}
    </ul>
    <GiHamburgerMenu size={20} id="hamburger-button" onClick={() => setOpenNavPanel(true)}/>
    {openNavPanel && <NavPanel setOpenNavPanel={setOpenNavPanel} sessionLinks={sessionLinks}/>}
    </>
    )

};

export default Navigation;