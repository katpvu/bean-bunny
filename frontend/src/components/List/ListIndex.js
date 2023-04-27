import { useDispatch, useSelector } from "react-redux";
import ListIndexItem from "./ListIndexItem";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import Header from "../Header";
import ListForm from "./ListForm";
import "./index.css"

const ListIndex = (props) => {
    const lists = useSelector(getLists);
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);

    useEffect(() => {
        dispatch(fetchLists(lists))
    }, [])

    
    return (
        <>
            <Header />
            <div className="list-index-title">
                <h1>Your Collections</h1>
            </div>
            <div className="create-list-container">
                <div 
                    onClick={(e)=>setHover(true)} 
                    className={!hover ? "list-add-to-list-button" : "create-list-input"}
                        >
                    {!hover ? "+" : <ListForm />}
                </div>
            </div>
            
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