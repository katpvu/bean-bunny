import { useEffect } from "react";
import "./index.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import BunnyRatingInput from "../Rating/BunnyRatingInput";

const SearchResultItem = ({business, prevPage}) => {
    
    return (
        <Link className="search-item-container" 
            to={{
                pathname: `/businesses/${business?.businessYelpId}`,
                state: {from: prevPage}
            }} 
        >
            <div className="search-item-img-container">
                <img src={`${business?.imageUrl}`} alt={business?.name} className="item-img"/>
            </div>
            <div className="search-item-info">
                <h1 className="search-business-name">{business?.name}</h1>
                <p>{business?.location?.address1}</p>
                <BunnyRatingInput rating={business?.yelpRating} disabled={true} />
            </div>
        </Link>
    );
};

export default SearchResultItem