import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import './index.css'

const ProfileButton = ({user}) => {
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

    const styles = {
        A: "profile-drop-down-container",
        B: "center",
        C: "profile-dropdown",
        D: "profile-dropdown-list-item",
        E: "logout-button",
        F: "username-profile-dd"
    }

    return (
        <>
            <div onClick={openMenu} className={`${styles.A} ${styles.B}`}>
                <FontAwesomeIcon icon={faUser} style={{color: "#3e3c3c", cursor: 'pointer'}} />    
            </div>
            {showMenu && (
                <div>
                    <ul className={`${styles.C}`}>
                        <li className={`${styles.D}`}>Welcome, <br></br><h2 className={`${styles.F}`}>{user.username}</h2></li>
                        <li className={`${styles.D}`}><Link to="/lists">Your Lists</Link></li>
                        <li className={`${styles.D}`}>
                            <div onClick={handleLogout} className={`${styles.E}`}>Logout</div>
                        </li>
                    </ul>
                </div>
            )}
        </>
        )
    
};

export default ProfileButton;