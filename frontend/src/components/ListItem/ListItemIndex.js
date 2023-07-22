import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearLists, fetchListContents} from "../../store/list";
import { clearListItems, getListItems } from "../../store/list_items";
import ListItemCard from "./ListItemCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import ListForm from "../List/ListForm";
import { deleteList } from "../../store/list";
import "./index.css"


const ListItemIndex = (props) => {
    const dispatch = useDispatch();
    const { listId } = useParams();
    const history = useHistory();
    const [openEditForm, setOpenEditForm] = useState(false);

    const listItems = useSelector(getListItems);
    const list = useSelector(state => state.lists);

    useEffect(() => {
        dispatch(fetchListContents(listId));

        return () => {
            dispatch(clearLists());
            dispatch(clearListItems());
        }
    }, [dispatch, listId, openEditForm]);

    const handleDelete = () => {
        dispatch(deleteList(list?.id))
            .then(() => history.push("/lists"))
    }
    return (
        <>
        <div className="list-main-content">
            <div className="list-title-container">
                <div className="list-header-container">
                    <FontAwesomeIcon onClick={()=> history.push("/lists")} className="back-button" icon={faArrowLeft} style={{color: "#404040",}} />
                        <h1 className={openEditForm ? "list-title-edit" : "list-title"}>{openEditForm ? <ListForm listId={list?.id} onClose={() => setOpenEditForm(false)}/> : list?.title}</h1>
                        <div 
                            className="delete-collection-button"
                            onClick={handleDelete}>Delete Collection</div>
                    <div></div>
                </div>
            </div>

            
            <div className="list-contents-container">
                {listItems.map(listItem => (
                    <ListItemCard key={listItem.id} listItem={listItem} />
                ))}
            </div>
        </div>
        </>
    )
};

export default ListItemIndex;