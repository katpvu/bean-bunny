import { Link } from "react-router-dom";
import { createList } from "../../store/list";
import { createListItem } from "../../store/list_items";
import { fetchListByTitle } from "../../store/list";
import { checkErrors } from "../../utils";
import { deleteListItem } from "../../store/list_items";
import { useDispatch } from "react-redux";

const SaveButton = ({
    saved, 
    setSaved, 
    history, 
    list, 
    sessionUser,
    business, 
    businessId, 
    setErrors,
    currentListItem,
    setCurrentListItem,
    listsLoaded
}) => {
    const dispatch = useDispatch();

    const handleAddToList = () => {
        if (sessionUser === null) return history.push("/login");
        if (listsLoaded && !Object.keys(list).length){
            dispatch(createList({
                userId: sessionUser.id,
                title: business.location.city
            }, businessId))
            .then(() => setSaved(true))
            .then(() => dispatch(fetchListByTitle(business.location.city)));
        } else if (Object.keys(list).length){
            const newListItem = {
                businessYelpId: businessId,
                listId: list.id
            };
            dispatch(createListItem(newListItem))
                .then(() => setSaved(true))
                .then(() => dispatch(fetchListByTitle(business?.location?.city)))
                .catch(async res => {
                    let errors = await checkErrors(res);
                    setErrors(errors);
                });
            };
    };

    const handleRemoveFromList = () => {
        dispatch(deleteListItem(currentListItem?.id))
            .then(() => setSaved(false))
            .then(() => setCurrentListItem(null))
            .then(() => dispatch(fetchListByTitle(business?.location?.city)))
    }


    if (listsLoaded && !saved) {
        return (
            <div 
                className="business-page-save-button"
                onClick={handleAddToList}
            >save</div>
        )
    } else if (listsLoaded && saved){
        return (
            <>
            <div className="save-button-container">
                <p>saved in <Link 
                    to={{pathname: `/lists/${list.id}`, state: {from: `/businesses/${businessId}`}}}
                    className="bold-and-uppercased">{business?.location?.city}</Link> collection</p>
                <div 
                    className="business-page-save-button"
                    onClick={handleRemoveFromList}
                >unsave</div>
            </div>
            </>
        )
    }
};

export default SaveButton;