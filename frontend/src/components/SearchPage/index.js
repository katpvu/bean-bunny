import Header from "../Header";
import {  useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"
import SearchResults from "../SearchResults";
// import ListForm from "../List/ListForm";
import MapWrapper from "../Map";
import SearchBar from "../SearchBar";
import Navigation from "../Navigation";
// import { useEffect } from "react";
// import { fetchSearches, getSearches } from "../../store/search";

const SearchPage = (props) => {
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const searchResults = useSelector(state => Object.values(state.searches));
    const { location } = useParams();
    if (sessionUser === null) return <Redirect to="/login" />;

    

    let mapOptions;
    mapOptions = {
        center: {
            lat: searchResults[0]?.coordinates.latitude,
            lng: searchResults[0]?.coordinates.longitude
        },
        zoom: 12
    }

    const markerEventHandlers = {
        'click': (business) => history.push(`/businesses/${business?.id}`, {from: `/search${location}`})
    }

    return (
        <>
            <div className="below-header-content-container">
                <div className="search-page-section">
                    <SearchBar />
                    <div className="main-content-container">
                        <SearchResults searchResults={searchResults} prevPage={location}/>
                        <div className="placeholder-for-map">
                            <MapWrapper businesses={searchResults} mapOptions={mapOptions} markerEventHandlers={markerEventHandlers} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
};
export default SearchPage