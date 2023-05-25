import "./index.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SearchResultItem = ({business, prevPage}) => {

    return (
        <Link className="search-item-container" 
            to={{
                pathname: `/businesses/${business?.businessYelpId}`,
                state: {from: prevPage}
            }} 
        >
            <img src={`${business?.imageUrl}`} alt={business?.name} className="item-img"/>
            <div className="search-item-info">
                <h1 className="search-business-name">{business?.name}</h1>
                <p>{business?.location?.address1}</p>
            </div>
        </Link>
    );
};

export default SearchResultItem