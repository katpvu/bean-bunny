import ListForm from "../List/ListForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from "@fortawesome/free-solid-svg-icons";
const ListDropDown = ({lists, handleAddToList}) => {
    return (
        <>
            <h2>Add to Collection:</h2>
            <div className="form-container-in-bp">
                <ListForm />
            </div>
            { lists.map(list => 
                <li key={list.id} onClick={(e) => handleAddToList(e, list)}>
                    <FontAwesomeIcon icon={faListUl} />
                    <h3>{list.title}</h3>
                </li>
            )}
        </>
        
    )
};

export default ListDropDown;