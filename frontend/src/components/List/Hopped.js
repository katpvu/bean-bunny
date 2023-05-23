
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

    const sessionUser = useSelector(state =>  state.session);
    const businesses = useSelector(getCurrentUserBusinessesRated)
    const ratings = useSelector(getCurrentUserRatings)

    useEffect(() => {
        console.log(sessionUser);
        console.log(businesses)
    }, [])

    
    return (
        <>
            <Header />
            <div className="below-header-content-container">
                <Navigation />
                <HoppedIndex 
                    businesses={businesses} 
                    currentUserRatings={ratings}/>
            </div>
        </>
    )
};

export default Hopped;