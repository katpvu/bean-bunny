import './hopped.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const HoppedIndexItem = ({businesses, index, rating}) => {

    const [business, setBusiness] = useState({});
    const [businessCity, setBusinessCity] = useState("")

    useEffect(() => {
        const currentBus = businesses.find((business) => business.businessYelpId === rating.businessYelpId)
        setBusiness(currentBus)
        setBusinessCity(currentBus.location.city)
    }, [])
    // let businessRating;
    // ratings.forEach(rating => {
    //     if (rating.businessYelpId === business.id && rating.userId === sessionUser.id) businessRating = rating 
    // })

    return (
        <Link className="hopped-all-content" to={{
            pathname: `/businesses/${business?.businessYelpId}`,
            state: {from: "/hopped"}
        }}>
                <div className="hopped-text-content">
                    <img src={business?.imageUrl} />
                    <div className="text-content">
                        <h2>{index+1}. {business.name}</h2>
                        <h3>{businessCity}</h3>
                        <p>Notes: {rating?.notes ? rating?.notes : "-"}</p>
                        <p>Favorite orders: {rating?.favOrders ? rating?.favOrders : "-"}</p>
                    </div>
                </div>

                <div className="hopped-rating">{rating?.rating}</div>

        </Link>
    );
};

export default HoppedIndexItem;