import "./index.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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