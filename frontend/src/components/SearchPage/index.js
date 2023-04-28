import Header from "../Header";
import {  useSelector } from 'react-redux';
import { Redirect, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"
import SearchResults from "../SearchResults";
import ListForm from "../List/ListForm";
import MapWrapper from "../Map";
import { useEffect } from "react";

const SearchPage = (props) => {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const searchResults = useSelector(state => Object.values(state.searches));
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
        'click': (businessId) => history.push(`/businesses/${businessId}`)
    }

    return (
        <>
            <Header />
            <div className="main-content-container">
                <SearchResults searchResults={searchResults}/>
                <div className="placeholder-for-map">
                    <MapWrapper businesses={searchResults} mapOptions={mapOptions} markerEventHandlers={markerEventHandlers} />
                </div>
            </div>
        </>
    )
};
export default SearchPage