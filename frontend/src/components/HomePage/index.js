import Header from "../Header";
import {  useSelector } from 'react-redux';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"
import SearchResults from "../SearchResults";
import ListForm from "../List/ListForm";

const HomePage = (props) => {
    const sessionUser = useSelector(state => state.session.user);

    const searchResults = useSelector(state => Object.values(state.searches))
    if (sessionUser === null) return <Redirect to="/login" />;
    return (
        <>
            <Header />
            <div className="main-content-container">
                <div className="placeholder-for-map"></div>
                <SearchResults searchResults={searchResults}/>
            </div>
        </>
    )
};
export default HomePage