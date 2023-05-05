// will be an option in BusinessPageItem when user clicks bookmark icon along with ListIndex

import { useEffect, useState } from "react";
import { createList, updateList } from "../../store/list";
import { checkErrors } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../store/list";


const ListForm = ({listId, onClose}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user)
    // need to grab lists from state
    const lists = useSelector(getLists);

    // need to fetch lists from backend


    const handleSubmit = (e) => {
        e.preventDefault();
        const newList = { 
            title: title,
            user_id: sessionUser.id
         } 
        if (listId) {
            newList.id = listId;
            dispatch(updateList(newList))
                .then(setErrors(null))
                .then(onClose())
                .catch(async res => {
                    let errors = await checkErrors(res)
                    console.log(errors)
                    setErrors(errors)
            });
        } else {
            dispatch(createList(newList))
                .catch(async res => {
                    let errors = await checkErrors(res)
                    setErrors(errors)
                });
        }
        setTitle("");
        
    }

    return (

            <form onSubmit={handleSubmit}>
                {errors && (
                    <ul>
                        {errors.map(error => <li className="errors" key={error}>{error}</li>)}
                    </ul>
                )}
                 
                <input className="create-list-input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={ listId ? "New title" : " + Create a list "}/>
            </form>

    )
};

export default ListForm;