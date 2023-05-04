
import { useSelector } from "react-redux";
import './index.css'
import bunnyAvatar from "../../assets/bunny-avatar.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faList, faCheck, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import {  useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { NavLink } from "react-router-dom";
import './index.css'


const Navigation = (props) => {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
      
    useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
        setShowMenu(false);
    };

    const doc = document.querySelector("#root")
    doc.addEventListener('click', closeMenu);
    
    return () => doc.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
            .then(history.push("/login"))
    }


    return (
        <>


            <ul className="nav-container">
                <li className="welcome-container">
                    <img src={bunnyAvatar} />
                    <div>
                        <p>Welcome,</p>
                        <h2 >{sessionUser.username}</h2>
                    </div>
                </li>
                <NavLink to="/search"><li><FontAwesomeIcon icon={faMagnifyingGlass} className="icon"/>Search</li></NavLink>
                <NavLink to="/hopped"><li><FontAwesomeIcon icon={faCheck} className="icon"/>Hopped</li></NavLink>
                <NavLink to="/lists"><li><FontAwesomeIcon icon={faList} className="icon"/>My Collections</li></NavLink>
                <li>
                    <div onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} className="icon"/>Logout</div>
                </li>
            </ul>
        </>
    )
};

export default Navigation;