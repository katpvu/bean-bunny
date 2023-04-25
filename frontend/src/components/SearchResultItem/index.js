import "./index.css"
const SearchResultItem = ({business}) => {
    console.log(business)
    return (
        <div className="search-item-container">
            <img src={`${business.imageUrl}`} alt="business-photo" className="item-img"/>
            <div className="search-item-info">
                <h1 className="search-business-name">{business.name}</h1>
                <p>{business.location.address1}</p>
            </div>
            
        </div>
    )
};

export default SearchResultItem