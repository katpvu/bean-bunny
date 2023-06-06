import HoppedIndex from "./HoppedIndex";
import { fetchUserDetail } from "../../store/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../../store/session";
import { getBusinesses } from "../../store/business";
import { getBusinessRatings } from "../../store/ratings";
import { clearBusinesses } from "../../store/business";
import { useState } from "react";

const Hopped = (props) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(getBusinesses)
    const ratings = useSelector(getBusinessRatings)
    const [loaded, setLoaded] = useState(false) 

    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch])

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchUserDetail(sessionUser.id))
                .then(() => setLoaded(true))
        }

        return () => {
            dispatch(clearBusinesses())
        }
    }, [dispatch, sessionUser])

    return (
        <div className="below-header-content-container">
        <HoppedIndex 
            businesses={businesses} 
            currentUserRatings={ratings}
            loaded={loaded}/>
        </div>
    )
    

};

export default Hopped;