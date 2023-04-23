import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';

const ProfileButton = ({user}) => {
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const openMenu = () => {
        console.log(showMenu, "before")
        if (showMenu) return;
        setShowMenu(true);
        // }
        console.log(showMenu, "after")
      };
      
      useEffect(() => {
        console.log("hello")
        console.log(showMenu)
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
            <button onClick={openMenu}>
                <FontAwesomeIcon icon={faUser} style={{color: "#3e3c3c",}} />    
            </button>
            {showMenu && (
                <div>
                    <ul className="profile-dropdown">
                        <li>Welcome, {user.username}</li>
                        <li>Link to lists</li>
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
        )
    
};

export default ProfileButton;