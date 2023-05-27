
import { useEffect, useState } from "react";
import { findAvg } from "../../utils";

const ScoresPanel = ({currentUser, ratings, business}) => {
    const [currentUserRating, setCurrentUserRating] = useState({});

    useEffect(() => {
        const ratings = Object.values(currentUser.ratings)
        setCurrentUserRating(ratings.find(rating => rating.businessYelpId === business?.businessYelpId))

    }, [])

    // let currentUserRating;
    let ratingsArray = [];
    ratings.forEach( rating => {
        ratingsArray.push(rating.rating)
    })
    let averageRating = findAvg(ratingsArray);

    useEffect(() => {
        // console.log(currentUserRating)
    },[])
    return (
        <>
        <div className="scores-panel-container">
                <div className="score-item">
                    <div className="rating">{currentUserRating ? currentUserRating?.rating : "-"}</div>
                    <div className="rating-info">
                        <h3>Your Rating</h3>
                        <p>What you think</p>
                    </div>
                    
                </div>
                <div className="score-item">
                    <div className="rating">{averageRating ? averageRating : "-"}</div>
                    <div className="rating-info">
                        <h3>Avg bean Rating</h3>
                        <p>what bean bunny users think</p>
                    </div>
                    
                </div>
                <div className="score-item">
                    <div className="rating">{business?.yelpRating}</div>
                    <div className="rating-info">
                        <h3>yelp Rating</h3>
                        <p>what everyone thinks</p>
                    </div>
                </div>
        </div>
        </>
    )
};
export default ScoresPanel