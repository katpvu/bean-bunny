import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { clearSearches, fetchSearch, getBusiness } from "../../store/search";
// import SearchResultItem from "../SearchResultItem";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchBusiness } from "../../store/business";
import { getBusiness } from "../../store/business";
import SearchResultItem from "../SearchResultItem"



const ListItemCard = ({listItem}) => {
    const dispatch = useDispatch();
    const {listId} = useParams();

    const business = useSelector(getBusiness(listItem.businessYelpId))

    useEffect(() =>{
        dispatch(fetchBusiness(listItem.businessYelpId))
    }, [])

    return (
        <div className="list-item-card-container">
            <SearchResultItem business={business} prevPage={`/lists/${listId}`}/>

        </div>
    )
};

export default ListItemCard;