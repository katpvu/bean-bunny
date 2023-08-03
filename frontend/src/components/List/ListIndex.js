import ListIndexItem from "./ListIndexItem";
import "./index.css"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ListIndex = ({lists}) => {
    const history = useHistory();


    return (
        <>
           <div className="list-index-section-container">
                <div className="list-index-title">
                    <h1>Your Collections</h1>
                </div>
                {lists && lists.length > 0 ? 
                <div className="list-index-container">
                    { lists.map(list => 
                        <ListIndexItem key={list.id} list={list} />
                    )}
                </div>
                :
                <div id="empty-collections" className="full-page">
                    <h2 className="empty-collections-text">hey there! <br></br> <br></br>searching and saving coffee shops will automatically generate collections for you</h2>
                    <div className="start-discovering-btn" onClick={() => history.push("/search")} >start discovering</div>
                </div>
            }
            </div>
        </>
    )
};

export default ListIndex