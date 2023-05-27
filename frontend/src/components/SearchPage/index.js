import Header from "../Header";
import {  useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"
import SearchResults from "../SearchResults";
// import ListForm from "../List/ListForm";
import MapWrapper from "../Map";
import SearchBar from "../SearchBar";
import Navigation from "../Navigation";
import { useEffect } from "react";
// import { fetchSearches } from "../../store/search";
// import { useEffect } from "react";
import { clearSearches, fetchSearches, getSearches } from "../../store/search";

const SearchPage = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const searchResults = useSelector(getSearches);
    const { location } = useParams();
    if (sessionUser === null) return <Redirect to="/login" />;




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

    return (
        <>
                <div className="search-page-section">
                    
                    {/* <div className="main-content-container"> */}
                        <div className="placeholder-for-map">
                            <MapWrapper businesses={searchResults} mapOptions={mapOptions} markerEventHandlers={markerEventHandlers} />
                            {/* <MapWrapper businesses={searchResults} markerEventHandlers={markerEventHandlers} /> */}

                        </div>
                        <div>
                        <SearchBar />

                        <SearchResults searchResults={searchResults} prevPage={location}/>
                        </div>

                    {/* </div> */}
                </div>
        </>
    )
};
export default SearchPage