import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListContents, getList } from "../../store/list";
import { getListItems } from "../../store/list_items";
import ListItemCard from "./ListItemCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import ListForm from "../List/ListForm";
import { deleteList } from "../../store/list";
import "./index.css"

const ListItemIndex = (props) => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const listItems = useSelector(getListItems)
    const list = useSelector(getList(listId))
    const history = useHistory()
    const [openEditForm, setOpenEditForm] = useState(false);
    
    console.log(list)

    useEffect(() => {
        dispatch(fetchListContents(listId));
    }, []);

    return (
        <>
            <Header />
            <div>
                <div className="list-title-container">
                    <div className="list-header-container">
                        <FontAwesomeIcon onClick={()=> history.push("/lists")}className="back-button"icon={faArrowLeft} style={{color: "#404040",}} />
                        <h1 className="list-title">{list?.title}</h1>
                        <FontAwesomeIcon icon={faEllipsisVertical} size="2xl" style={{color: "#2a2b2d",}} />
                    </div>
                    <div>
                            <button onClick={() => dispatch(deleteList(list.id))}>Delete</button>
                            <button onClick={() => setOpenEditForm(true)}>Edit</button>
                            {openEditForm && (
                                <ListForm listId={list.id}/>
                            )}
                    </div>
                </div>
                
                <div className="list-contents-container">
                    {listItems.map(listItem => (
                        <ListItemCard key={listItem.id} listItem={listItem}/>
                    ))}
                </div>
            </div>
            
        </>
    )
};

export default ListItemIndex;