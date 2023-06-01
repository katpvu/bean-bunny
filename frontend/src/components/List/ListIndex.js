import { useDispatch, useSelector } from "react-redux";
import ListIndexItem from "./ListIndexItem";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import Header from "../Header";
import ListForm from "./ListForm";
import "./index.css"

const ListIndex = ({lists}) => {
    return (
        <>
           <div className="list-index-section-container">
                <div className="list-index-title">
                    <h1>Your Collections</h1>
                </div>
                <div className="list-index-container">
                    { lists.map(list => 
                        <ListIndexItem key={list.id} list={list} />
                    )}
                </div>
            </div>
        </>
    )
};

export default ListIndex