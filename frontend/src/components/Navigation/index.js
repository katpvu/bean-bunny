import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";

const Navigation = (props) => {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            <ProfileButton user={sessionUser}/>
            <ul>
                <li></li>
            </ul>
        
        </>
    )
};

export default Navigation;