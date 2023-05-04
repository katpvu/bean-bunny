import { useDispatch, useSelector } from "react-redux";
import ListIndexItem from "./ListIndexItem";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import Header from "../Header";
import ListForm from "./ListForm";
import "./index.css"
import Navigation from "../Navigation";
import ListIndex from "./ListIndex";

const ListIndexPage = (props) => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    
    const lists = useSelector(getLists);

    useEffect(() => {
        dispatch(fetchLists(lists))
    }, [])

    
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

export default ListIndexPage;