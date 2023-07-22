import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import "./index.css"
import ListIndex from "./ListIndex";
import { clearListItems } from "../../store/list_items";
import { SuperBalls } from "@uiball/loaders";
import { restoreSession } from "../../store/session";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const ListIndexPage = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    
    const lists = useSelector(getLists);
    const sessionUser = useSelector(state => state.session.user.user)

    const [loaded, setLoaded] = useState(false);
    
    
    if (!sessionUser) history.push("/")
    
    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch])

    useEffect(() => {
        if (sessionUser) {
            dispatch(fetchLists())
                .then(() => setLoaded(true));
        }

        return () => {
            dispatch(clearListItems());
        };
    }, [dispatch, sessionUser]);

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