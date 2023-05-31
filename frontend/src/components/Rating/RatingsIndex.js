import { useEffect } from "react";
import "./RatingsIndex.css"
import BunnyRatingInput from "./BunnyRatingInput";
const RatingsIndex = ({ratings}) => {

    useEffect(() => {
        console.log(ratings)
    }, [])
    return (
    <>
        <h1 className="ratings-container-title">THOUGHTS FROM OTHERS</h1>
        <div className="bp-ratings-index-container">
            {ratings.map((rating, i) => (
                <div className="rating-item-container">
                    <BunnyRatingInput rating={rating.rating} disabled={true} />
                    <h2>{rating.notes}</h2>
                    <p>FAVORITE ORDER: {rating.favOrders}</p>
                    {/* {ratings.photoUrls.map((url) => (
                        <img src={url} />
                    ))} */}
                </div>
            ))}
        </div>
    </>
    
    );
};

export default RatingsIndex;