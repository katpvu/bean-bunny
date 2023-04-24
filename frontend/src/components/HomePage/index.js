import Header from "../Header";
import {  useSelector } from 'react-redux';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css"

const HomePage = (props) => {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser === null) return <Redirect to="/login" />;
    return (
        <>
            <Header />
            <h2>This is the home Page</h2>
            <div className="placeholder-for-testing"></div>
        </>
    )
};
export default HomePage