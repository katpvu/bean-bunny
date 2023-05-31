import Header from "../Header";
import {  useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"
import SearchResults from "../SearchResults";
import MapWrapper from "../Map";
import SearchBar from "../SearchBar";
import { useState } from "react";
import { useEffect } from "react";
import { clearSearches, fetchSearches, getSearches } from "../../store/search";
import { SuperBalls } from "@uiball/loaders";
const SearchPage = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const searchResults = useSelector(getSearches);
    const { location } = useParams();
    // if (sessionUser === null) return <Redirect to="/login" />;
    const [userSearch, setUserSearch] = useState(false)
    const [searchCity, setSearchCity] = useState("");
    const [searchState, setSearchState] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setUserSearch(true)
        if (userSearch) {
            setSearchCity(searchResults[0]?.location.city)
            setSearchState(searchResults[0]?.location.state)
        }

        return () => {
            setSearchCity("")
            setSearchState("")
        }
    }, [searchResults])

    useEffect(() => {
        return () => {
            dispatch(clearSearches());
        }
    }, [])

    let mapOptions;
    if (searchResults) {
        mapOptions = {
            center: {
                lat: searchResults[0]?.coordinates?.latitude,
                lng: searchResults[0]?.coordinates?.longitude
            },
            zoom: 12
        }
    }

    const markerEventHandlers = {
        'click': (business) => history.push(`/businesses/${business?.id}`, {from: `/search${location}`})
    }

    useEffect(() => {
        console.log(searchResults)
    }, []) 

    const searchContent = () => {
        if (searchResults.length > 0) {
            return (
                <>
                <SearchBar />
                <div className="search-res-header">
                    <p>coffee shops for</p>
                    <h1 className="search-location">{`${searchCity}, ${searchState}`}</h1>
                </div>
                <div className="search-page-section">
                        <div className="placeholder-for-map">
                            <MapWrapper businesses={searchResults} mapOptions={mapOptions} markerEventHandlers={markerEventHandlers} />
                        </div>
                        <div>
                            <SearchResults searchResults={searchResults} prevPage={location}/>
                        </div>
                </div>
                </>
            )
        } else if (searchResults.length === 0) {
            return (
                <div>
                    <SearchBar/>
                </div>
            )
        }
    }

    return (
        <>
        {searchContent()}
        </>
        // <>
        //         <SearchBar />
        //         <div className="search-page-section">
        //             <div className="placeholder-for-map">
        //                 <MapWrapper businesses={searchResults} mapOptions={mapOptions} markerEventHandlers={markerEventHandlers} />
        //             </div>
        //             <div>
        //                 <SearchResults searchResults={searchResults} prevPage={location}/>
        //             </div>
        //         </div>
        // </>
    )
};
export default SearchPage