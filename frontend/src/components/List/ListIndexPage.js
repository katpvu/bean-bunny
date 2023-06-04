import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import "./index.css"
import ListIndex from "./ListIndex";
import { clearListItems } from "../../store/list_items";
import { SuperBalls } from "@uiball/loaders";

const ListIndexPage = (props) => {
    const dispatch = useDispatch();

    const [loaded, setLoaded] = useState(false);
    
    const lists = useSelector(getLists);

    useEffect(() => {
        dispatch(fetchLists())
            .then(() => setLoaded(true));

        return () => {
            dispatch(clearListItems());
        };
    }, []);

    return (
        <>
        {loaded ? 
            <ListIndex lists={lists}/>
        : 
        <div className="loader-container">
        <SuperBalls 
            size={45}
            speed={1.4} 
            color="black" 
        /> 
        </div>
        }
        
        </>
    )
};

export default ListIndexPage;