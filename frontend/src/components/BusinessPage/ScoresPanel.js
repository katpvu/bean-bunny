
import { findAvg } from "../../utils";

const ScoresPanel = ({businessYelpRating, sessionUser, ratings}) => {

    let currentUserRating;
    let ratingsArray = [];
    ratings.forEach( rating => {
        if (rating.userId === sessionUser.id) {
            currentUserRating = rating
        }
        ratingsArray.push(rating.rating)
    })
    let averageRating = findAvg(ratingsArray);

    return (
        <>
            <div className="scores">
                <h1 className="business-section-title">Scores</h1>
                <div className="score-item">
                    <div className="rating">{currentUserRating ? currentUserRating.rating : "-"}</div>
                    <div className="rating-info">
                        <h3>Your Bean Rating</h3>
                        <p>What you think</p>
                    </div>
                    
                </div>
                <div className="score-item">
                    <div className="rating">{averageRating ? averageRating : "-"}</div>
                    <div className="rating-info">
                        <h3>Overall Bean Rating</h3>
                        <p>Average rating from Bean Bunny users!</p>
                    </div>
                    
                </div>
                <div className="score-item">
                    <div className="rating">{businessYelpRating}</div>
                    <div className="rating-info">
                        <h3>Current Yelp Rating</h3>
                        <p>Compare everyone's rating vs. just coffee lovers!</p>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ScoresPanel