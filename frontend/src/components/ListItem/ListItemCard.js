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
        <div className="list-item-card-container">
            <SearchResultItem business={business} prevPage={`/lists/${listId}`}/>
            <FontAwesomeIcon icon={faCircleXmark} onClick={() => dispatch(deleteListItem(listItem.id))} className="remove-btn-container" size="xl"/>
        </div>
    )
};

export default ListItemCard;