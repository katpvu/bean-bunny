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
        'click': (business) => history.push(`/businesses/${business?.businessYelpId}`, {from: `/search${location}`})
    }

    // useEffect(() => {
    //     console.log(searchResults)
    // }, []) 

    const searchContent = () => {
        if (location) {
            if (searchResults.length === 0) {
                return (
                    <>
                    <div className="search-res-header">
                        <p>coffee shops for</p>
                        <SearchBar location={location}/>
                        {/* <h1 className="search-location">{`${searchCity}, ${searchState}`}</h1> */}
                    </div>
                    <div id="search-page" className="loader-container">
                        <SuperBalls 
                            size={45}
                            speed={1.4} 
                            color="black" 
                            
                        /> 
                    </div> 
                    </>
                )
            } else {
                return (
                    <>
                    <div className="search-res-header">
                        <p>coffee shops for</p>
                        <SearchBar location={location}/>
                        {/* <h1 className="search-location">{`${searchCity}, ${searchState}`}</h1> */}
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

                }
        } else if (!location || searchResults.length === 0) {
            return (
                <div id="empty-search-page">
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