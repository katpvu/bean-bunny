import { useEffect } from "react";
import { useState } from "react";
import SearchResultItem from "../SearchResultItem";
import "./index.css"

const SearchResults = ({searchResults, prevPage, setHoveredBusiness}) => {

    return (
        <>
            <div className="search-results-container">
                {searchResults.map((searchBusiness, i) => {
                    const business = {
                        businessYelpId: searchBusiness.businessYelpId,
                        coordinates: searchBusiness.coordinates,
                        location: searchBusiness.location,
                        name: searchBusiness.name,
                        isClosed: searchBusiness.isClosed,
                        yelpRating: searchBusiness.yelpRating,
                        imageUrl: searchBusiness.imageUrl
                    }
                    return <SearchResultItem setHoveredBusiness={setHoveredBusiness} business={business} key={business.id} prevPage={prevPage}/>
                })}
            </div>
        </>
    )
}

export default SearchResults;