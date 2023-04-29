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
    console.log(listItem, "listItem")
    const business = useSelector(getBusiness(listItem.businessYelpId))
    const {listId} = useParams();
    // console.log(business, "getting business")

    useEffect(() =>{
        dispatch(fetchBusiness(listItem.businessYelpId))
    }, [])

    return (
        <div className="list-item-card-container">
            <SearchResultItem business={business}/>

        </div>
    )
};

export default ListItemCard;