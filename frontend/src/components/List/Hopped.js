
import Header from "../Header";
import Navigation from "../Navigation";
import HoppedIndex from "./HoppedIndex";
import { fetchUserDetail } from "../../store/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const Hopped = (props) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => Object.values(state.businesses))
    const ratings = useSelector(state => Object.values(state.ratings))

    useEffect(() => {
        dispatch(fetchUserDetail(sessionUser.id))
    }, [dispatch, sessionUser.id])
    
    return (
        <>
            <Header />
            <div className="below-header-content-container">
                <Navigation />
                <HoppedIndex businesses={businesses} ratings={ratings}/>
            </div>
        </>
    )
};

export default Hopped;