import { useEffect } from "react";
import { useState } from "react";
import SearchResultItem from "../SearchResultItem";
import "./index.css"

const SearchResults = ({searchResults, prevPage}) => {
    const [userSearch, setUserSearch] = useState(false)
    const [searchCity, setSearchCity] = useState("");
    const [searchState, setSearchState] = useState("")
    // console.log(searchResults)

    useEffect(() => {
        setUserSearch(true)
        if (userSearch) {
            setSearchCity(searchResults[0].location.city)
            setSearchState(searchResults[0].location.state)
        }

        return () => {
            setSearchCity("")
            setSearchState("")
        }
    }, [searchResults])
    

    return (
        <>
            {!searchCity && (
                <div className="search-results-container">
                    <h1>hi</h1>
                </div>
            )

            }
            {searchCity && (
                <>
                    <div className="search-results-container">
                        <div className="search-res-header">
                            <p>coffee shops for</p>
                            <h1 className="search-location">{`${searchCity}, ${searchState}`}</h1>
                        </div>
                        
                        {searchResults.map(business => (
                            <SearchResultItem business={business} key={business.id} />
                        ))}

                        
                    </div>

                </>
            )}
        
        
        </>
    )
}

export default SearchResults;