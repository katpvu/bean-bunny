import ProfileButton from "./ProfileButton";
import { useSelector } from "react-redux";
import './index.css'

const Navigation = (props) => {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <>
            <div>
                <ProfileButton user={sessionUser}/>
            </div>
        
        </>
    )
};

export default Navigation;