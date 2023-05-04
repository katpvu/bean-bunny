import './hopped.css'
import { Link } from 'react-router-dom';

const HoppedIndexItem = ({business, index, ratings}) => {
    let businessRating;
    ratings.forEach(rating => {
        if (rating.businessYelpId === business.id) businessRating = rating 
    })
    console.log(business.id, "businessID from hopped index item")

    return (
        <Link className="hopped-all-content" to={{
            pathname: `/businesses/${business?.id}`,
            state: {from: "/hopped"}
        }}>
                <div className="hopped-text-content">
                    <img src={business?.imageUrl} />
                    <div className="text-content">
                        <h2>{index+1}. {business.name}</h2>
                        <h3>{business.location.city}</h3>
                        <p>Notes: {businessRating?.notes ? businessRating?.notes : "-"}</p>
                        <p>Favorite orders: {businessRating?.favOrders ? businessRating?.favOrders : "-"}</p>
                    </div>
                </div>

                <div className="hopped-rating">{businessRating?.rating}</div>

        </Link>
    );
};

export default HoppedIndexItem;