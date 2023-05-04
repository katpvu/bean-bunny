import Header from "../Header";
import {  useSelector } from 'react-redux';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"
import Navigation from "../Navigation";
import ListItemIndex from "../ListItem/ListItemIndex";
import ListIndex from "../List/ListIndex";



const HomePage = (props) => {
    const sessionUser = useSelector(state => state.session.user);

    const searchResults = useSelector(state => Object.values(state.searches))
    if (sessionUser === null) return <Redirect to="/login" />;
    return (
        <>
            <Header />
            <div className="below-header-content-container">
                <Navigation />
                <ListIndex />
            </div>
            
        </>
    )
};
export default HomePage