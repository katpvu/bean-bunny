import SearchResultItem from "../SearchResultItem";
import "./index.css"

const SearchResults = ({searchResults}) => {

    return (
        <>
        <div className="search-results-container">
            <h1 className="search-res-header">Coffee Shops Near You:</h1>
            {searchResults.map(business => (
                <SearchResultItem business={business} key={business.id} />
            ))}
        </div>
        
        </>
    )
}

export default SearchResults;