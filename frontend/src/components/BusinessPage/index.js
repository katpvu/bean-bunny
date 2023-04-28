import "./index.css"
import ListForm from "../List/ListForm";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getLists, fetchLists } from "../../store/list";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { createListItem } from "../../store/list_items";
import { checkErrors } from '../../utils';
import MapWrapper from "../Map";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getBusiness } from "../../store/business";
import { fetchBusiness } from "../../store/business";

const BusinessPage = ({business}) => {
    const dispatch = useDispatch();
    const lists = useSelector(getLists);
    const [toggleMenu, setToggleMenu] = useState(false)
    const [errors, setErrors] = useState([]);
    const { businessId } = useParams();

    if (businessId) {
        business = useSelector(getBusiness(businessId))
    }
    
    useEffect(() =>{
        if (businessId) {
            dispatch(fetchBusiness(businessId))
        }
    }, [businessId])
    

    let mapOptions;
        mapOptions = {
            center: {
                lat: business?.coordinates.latitude,
                lng: business?.coordinates.longitude
            },
            zoom: 15
        }


    const handleAddToList = (e, list) => {
        setToggleMenu(false)
        // console.log(list)
        // console.log("hi")
        const newListItem = {
            business_yelp_id: business.id,
            list_id: list.id
        };
        dispatch(createListItem(newListItem))
            .catch(async res => {
                let errors = await checkErrors(res)
                setErrors(errors)
            });

    }

    const handleToggle = () => {
        setToggleMenu(true)
        if (toggleMenu) {
            setToggleMenu(false)
        }
    }

    return (
        <div className="business-page-container">
            <img src={`${business.imageUrl}`} alt={business.name} className="fitting-image"/>
            <div className="bp-header-overlay">
                <h1 className="business-page-title">{business.name}</h1>
            </div>

            <div className="business-info-wrapper">
                <div className="business-info-header">
                    <div>
                        <h1 className="business-section-title">Location</h1>
                        <p>{business.location.address1}</p>
                        <p>{business.location.city}, {business?.location.state}</p>
                    </div>
                    <div className="buttons-container">
                        <div className="rating-button">Create Rating</div>
                        <div className="add-to-list-button" onClick={handleToggle}>{toggleMenu ? "x" : "+"}</div>
                    </div>
                    <ul className={toggleMenu ? "list-index-drop-down" : "hidden"}>
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
                    </ul>
                </div>
                <br></br>
                <h1 className="business-section-title">Scores</h1>
    
                <div className="scores">
                    <div className="score-item">
                        <div className="rating">-</div>
                        <div className="rating-info">
                            <h3>Your Bean Rating</h3>
                            <p>What you think</p>
                        </div>
                        
                    </div>
                    <div className="score-item">
                        <div className="rating">-</div>
                        <div className="rating-info">
                            <h3>Overall Bean Rating</h3>
                            <p>Average rating from Bean Bunny users!</p>
                        </div>
                        
                    </div>
                    <div className="score-item">
                        <div className="rating">{business?.rating}</div>
                        <div className="rating-info">
                            <h3>Current Yelp Rating</h3>
                            <p>Compare everyone's rating vs. just coffee lovers!</p>
                        </div>
                    </div>
                </div>
                
                <h1 className="business-section-title">Your notes and photos</h1>
                <div className="bp-map-container">
                    <MapWrapper businesses={[business]} mapOptions={mapOptions}/>
                </div>
                <h1 className="business-section-title">What your friends think</h1>
            </div>
            </div>
            
    )
};

export default BusinessPage;