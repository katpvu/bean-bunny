import "./index.css"
const SearchResultItem = ({business}) => {
    console.log(business)
    return (
        <div className="search-item-container">
            <h1 className="search-business-name">{business.name}</h1>
            <p>{business.location.address1}</p>

        </div>
    )
};

export default SearchResultItem