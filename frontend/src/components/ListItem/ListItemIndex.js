import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListContents, getList } from "../../store/list";
import { getListItems } from "../../store/list_items";
import ListItemCard from "./ListItemCard";


const ListItemIndex = (props) => {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const listItems = useSelector(getListItems)
    const list = useSelector(getList(listId))
    console.log(list)

    useEffect(() => {
        dispatch(fetchListContents(listId));
    }, []);

    return (
        <>
            <Header />
            <h1>{list.title}</h1>
            <div className="list-contents-container">
                {listItems.map(listItem => (
                    <ListItemCard key={listItem.id} listItem={listItem}/>
                ))}
            </div>
        </>
    )
};

export default ListItemIndex;