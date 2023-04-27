import { useDispatch } from "react-redux";
import "./index.css"
import { deleteList } from "../../store/list";
import { useState } from "react";
import ListForm from "./ListForm";

const ListIndexItem = ({list}) => {
    const [openEditForm, setOpenEditForm] = useState(false);
    const dispatch = useDispatch();
    return (
        <>
            <div className="list-item">
                <h1>{list.title}</h1>
                <button onClick={() => dispatch(deleteList(list.id))}>Delete</button>
                <button onClick={() => setOpenEditForm(true)}>Edit</button>
                {openEditForm && (
                <ListForm listId={list.id}/>
            )}
            </div>
            
        </>
    )
};

export default ListIndexItem