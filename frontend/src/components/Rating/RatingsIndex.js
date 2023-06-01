import { useEffect } from "react";
import "./RatingsIndex.css"
import BunnyRatingInput from "./BunnyRatingInput";
const RatingsIndex = ({ratings}) => {

    return (
    <>
        <h1 className="ratings-container-title">THOUGHTS FROM OTHERS</h1>
        <div className="bp-ratings-index-container">
            {ratings.map((rating, i) => (
                <div key={i} className="rating-item-container">
                    <BunnyRatingInput rating={rating.rating} disabled={true} />
                    <h2>{rating.notes}</h2>
                    <p>FAVORITE ORDER: {rating.favOrders}</p>
                    <div className="review-photo-gallery">
                    {rating.photoUrls.map((url, i) => (
                        <div key={i} className="search-item-img-container">
                        <img src={url} className="item-img" alt="review"/>
                        </div>
                    ))}
                    </div>
                </div>
            ))}
        </div>
    </>
    
    );
};

export default RatingsIndex;