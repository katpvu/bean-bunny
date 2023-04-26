// will be an option in BusinessPageItem when user clicks bookmark icon along with ListIndex

import { useState } from "react";
import { createList } from "../../store/list";
import { checkErrors } from '../../utils';
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../../store/list";


const ListForm = (props) => {
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
         };
        dispatch(createList(newList))
            .catch(async res => {
                let errors = await checkErrors(res)
                setErrors(errors)
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map(error => <li className="errors" key={error}>{error}</li>)}
                </ul>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="+ Create a List"/>
            </form>
        </div>
    )
};

export default ListForm;