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

    const searchResults = useSelector(getSearches);
    const errors = useSelector(state => state.errors.searches)
    const { location } = useParams();
    const [mapOptions, setMapOptions] = useState({});

    useEffect(() => {
        return () => {
            dispatch(clearSearches());
        }
    }, [])

    useEffect(() => {
        let mapOptions;
        if (searchResults) {
            mapOptions = {
                center: {
                    lat: searchResults[0]?.coordinates?.latitude,
                    lng: searchResults[0]?.coordinates?.longitude
                },
                zoom: 13
            }
            setMapOptions(mapOptions)
        }
    }, [searchResults])

    const markerEventHandlers = {
        'click': (business) => history.push(`/businesses/${business?.businessYelpId}`, {from: `/search${location}`})
    }

    const searchContent = () => {
        if (location) {
            if (searchResults.length === 0) {
                return (
                    <>
                    <div className="search-res-header">
                        <p>coffee shops for</p>
                        <SearchBar location={location}/>
                    </div>
                    <div id="search-page" className="loader-container">
                    {errors 
                    ?
                    <div>
                        {errors.map((error, i) => (
                            <p id="search-error" key={i}>{error}</p>
                        ))}
                    </div>
                    :
                    <SuperBalls 
                        size={45}
                        speed={1.4} 
                        color="black" 
                    /> 
                    }
                    </div> 
                    </>
                )
            } else {
                return (
                    <>
                    <div className="search-res-header">
                        <p>coffee shops for</p>
                        <SearchBar location={location}/>
                    </div>

                    <div className="search-page-section">
                            <div className="placeholder-for-map">
                                <MapWrapper  businesses={searchResults} mapOptions={mapOptions} markerEventHandlers={markerEventHandlers} />
                            </div>
                            <div>
                                <SearchResults searchResults={searchResults} prevPage={location}/>
                            </div>
                    </div>
                    </>
            )}
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
    )
};
export default SearchPage