import HoppedIndex from "./HoppedIndex";
import { fetchUserDetail } from "../../store/users";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../../store/session";
import { getBusinesses } from "../../store/business";
import { getBusinessRatings } from "../../store/ratings";
import { clearBusinesses } from "../../store/business";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Hopped = (props) => {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(getBusinesses)
    const ratings = useSelector(getBusinessRatings)

    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch])

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchUserDetail(sessionUser.id))
        }

        return () => {
            dispatch(clearBusinesses())
        }
    }, [])

    return (
        <div className="below-header-content-container">
        <HoppedIndex 
            businesses={businesses} 
            currentUserRatings={ratings}/>
        </div>
    )
    

};

export default Hopped;