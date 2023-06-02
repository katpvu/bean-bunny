import { useEffect } from "react";
import "./RatingsIndex.css"
import BunnyRatingInput from "./BunnyRatingInput";
const RatingsIndex = ({ratings}) => {

    const convertDate = (date) => {
        const event = new Date(date);
        // const UTC = event.toUTCString()
        const options = {year: 'numeric', month: 'long', day: 'numeric' }
        return (
            <p>Posted on: {event.toLocaleDateString(undefined, options)}</p>
        )
    }

    return (
    <>
        <h1 className="ratings-container-title">THOUGHTS FROM OTHERS</h1>
        <div className="bp-ratings-index-container">
            {ratings.map((rating, i) => (
                <div key={i} className="rating-item-container">
                    <BunnyRatingInput rating={rating.rating} disabled={true} />
                    {convertDate(rating.createdAt)}
                    <p>{rating.author}</p>
                    <h2>{rating.notes}</h2>
                    {rating.favOrders 
                        ? <p>FAVORITE ORDER: {rating.favOrders}</p>
                        : "no favorite orders :("
                    }
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