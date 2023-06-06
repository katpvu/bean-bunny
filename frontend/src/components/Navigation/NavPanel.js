import {GrClose}  from "react-icons/gr"
import SocialLinks from "../SocialLinks/SocialLinks";

const NavPanel = ({setOpenNavPanel, sessionLinks}) => {
    return (
    <div id="nav-panel-container">
        <GrClose onClick={() => setOpenNavPanel(false)} id="nav-panel-close-btn" />
        {sessionLinks()}
        <SocialLinks />
    </div>
    );
};

export default NavPanel;