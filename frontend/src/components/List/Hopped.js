
import Header from "../Header";
import Navigation from "../Navigation";
import HoppedIndex from "./HoppedIndex";
import { fetchUserDetail } from "../../store/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../../store/session";
import { getCurrentUserBusinessesRated, getCurrentUserRatings } from "../../store/session";

const Hopped = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreSession());
        // dispatch(fetchUserDetail(sessionUser.id))
    }, [dispatch])

    const sessionUser = useSelector(state => state.session);
    const businesses = useSelector(getCurrentUserBusinessesRated)
    // const businesses = useSelector(state => state.session ? Object.values(state.session.currentUserBusinessesRated) : [])
    const ratings = useSelector(getCurrentUserRatings)
    // const ratings = useSelector(state => state.session ? Object.values(state.session.currentUserRatings) : [])

    useEffect(() => {
        console.log(sessionUser.currentUserBusinessesRated);
        // console.log(businesses)
    }, [])
    
    return (
        <>
            <div className="below-header-content-container">
                <HoppedIndex 
                    businesses={businesses} 
                    // businesses={Object.values(sessionUser.currentUserBusinessesRated)}
                    currentUserRatings={ratings}/>
                    {/* // ratings={Object.values(sessionUser.currentUserRatings)} */}
                    {/* /> */}
            </div>
        </>
    )
};

export default Hopped;