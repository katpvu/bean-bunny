import { useDispatch, useSelector } from "react-redux";
import "./index.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getListItem, getListItems } from "../../store/list_items";

const ListIndexItem = ({list}) => {

    return (
        <>
            <Link className="list-item" to={`/lists/${list.id}`}>
                <h1>{list?.title}</h1>
                <p>{list?.numListItems} coffee shops saved</p>
            </Link>
        </>
    )
};

export default ListIndexItem