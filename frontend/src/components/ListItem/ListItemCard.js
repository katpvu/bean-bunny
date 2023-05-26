import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearSearches, fetchSearch, getBusiness } from "../../store/search";
// import SearchResultItem from "../SearchResultItem";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchBusiness } from "../../store/business";
import { getBusiness } from "../../store/business";
import SearchResultItem from "../SearchResultItem"
import { deleteListItem } from "../../store/list_items";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
    }, [])

    // const business = useSelector(getBusiness(listItem.businessYelpId));

    // useEffect(() =>{
    //     dispatch(fetchBusiness(listItem.businessYelpId));
    // }, []);

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

            {/* <SearchResultItem business={business} prevPage={`/lists/${listId}`}/>
            <FontAwesomeIcon icon={faCircleXmark} onClick={() => dispatch(deleteListItem(listItem.id))} className="remove-btn-container" size="xl"/> */}
        </Link>
    )
};

export default ListItemCard;