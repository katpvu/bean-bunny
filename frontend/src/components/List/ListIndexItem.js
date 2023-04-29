import { useDispatch, useSelector } from "react-redux";
import "./index.css"
import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getListItem, getListItems } from "../../store/list_items";

const ListIndexItem = ({list}) => {
    console.log(list)

    const listItems = useSelector(getListItems);
    const listItemCount = listItems.length;
    return (
        <>
            <Link  className="list-item" to={`/lists/${list.id}`}><h1>{list?.title}</h1></Link>
        </>
    )
};

export default ListIndexItem