import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import "./index.css"
import ListIndex from "./ListIndex";
import { clearListItems } from "../../store/list_items";

const ListIndexPage = (props) => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(false);
    
    const lists = useSelector(getLists);

    useEffect(() => {
        dispatch(fetchLists())

        return () => {
            dispatch(clearListItems())
        }
    }, [])

    
    return (
        <ListIndex lists={lists}/>
    )
};

export default ListIndexPage;