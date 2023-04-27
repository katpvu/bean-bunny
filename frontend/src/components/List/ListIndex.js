import { useDispatch, useSelector } from "react-redux";
import ListIndexItem from "./ListIndexItem";
import { useEffect } from "react";
import { getLists, fetchLists } from "../../store/list";
import Header from "../Header";
import ListForm from "./ListForm";
import "./index.css"

const ListIndex = (props) => {
    const lists = useSelector(getLists);
    const dispatch = useDispatch();
    console.log(lists, "from list index")

    useEffect(() => {
        dispatch(fetchLists(lists))
    }, [])
    // need to grab lists from state
    
    // need to fetch lists from backend
    return (
        <>
            <Header />
            <ListForm />
            <div className="page-container">
                <div className="list-index-container">
                    { lists.map(list => 
                        <ListIndexItem key={list.id} list={list} />
                    )}
                </div>
            </div>
        </>
    )
};

export default ListIndex