import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { clearBusinesses } from "../../store/business";

const ListItemCard = ({listItem}) => {
    const dispatch = useDispatch();
    const {listId} = useParams();
    const [business, setBusiness] = useState({})

    useEffect(() => {
        const business = {
            name: listItem.name,
            businessYelpId: listItem.businessYelpId,
            imageUrl: listItem.imageUrl,
            isClosed: listItem.isClosed,
            location: listItem.location,
            yelpRating: listItem.yelpRating,
            coordinates: listItem.coordinates
        }
        setBusiness(business)

        return () => {
            dispatch(clearBusinesses())
        }
    }, [dispatch, listItem])

    return (
        <Link className="list-item-card-container"
            to={{
                pathname: `/businesses/${business?.businessYelpId}`,
                state: {from: `/lists/${listId}`}
            }}>
            <div className="list-item-image-container">
                <img src={business.imageUrl} alt="business-list-item" />
            </div>

            <div className="business-info-container">
                <div>
                    <h1>{business.name}</h1>
                </div>
                <div className="rating-and-address-container">
                    <div>
                        <p>{business?.location?.address1}</p>
                        <p>{business?.location?.city}, {business?.location?.state}</p>
                    </div>
                    <div className="list-item-rating">{business?.yelpRating}</div>
                </div>
            </div>
        </Link>
    )
};

export default ListItemCard;