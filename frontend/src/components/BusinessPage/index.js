import "./index.css"
import ListForm from "../List/ListForm";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getLists, fetchLists } from "../../store/list";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListUl, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createListItem } from "../../store/list_items";
import { checkErrors } from '../../utils';
import MapWrapper from "../Map";
import { fetchBusiness, getBusiness } from "../../store/business";
import { fetchSearches } from "../../store/search";
import Header from "../Header";

const BusinessPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const { from } = location.state;
    console.log(from)
    const { businessId } = useParams();

    const lists = useSelector(getLists);
    const business = useSelector(getBusiness(businessId))

    const [toggleMenu, setToggleMenu] = useState(false)
    const [errors, setErrors] = useState([]);
    
    useEffect(() =>{
        dispatch(fetchLists())
        dispatch(fetchBusiness(businessId))
    }, [])

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
        const newListItem = {
            business_yelp_id: business?.id,
            list_id: list?.id
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

    const handleCreateRating = () => {

    }

    const handleBackButton = () => {
        if (from.includes(' ')) {
            const location = {
                location: encodeURIComponent(from)
            }
            history.push(`/search/${location?.location}`)
            dispatch(fetchSearches(location))
        } else {
            history.push(from)
        }
    }

    return (
        <>
        

        <Header />
        <div className="business-page-container">
            <img src={`${business?.imageUrl}`} alt={business?.name} className="fitting-image"/>
            <div className="bp-header-overlay">
                <h1 className="business-page-title">{business?.name}</h1>
                <FontAwesomeIcon 
                    onClick={handleBackButton} 
                    className="bp-back-button" 
                    icon={faArrowLeft} 
                    style={{color: "#ffffff",}} />
            </div>

            <div className="business-info-wrapper">
                <div className="business-info-header">
                    <div>
                        <h1 className="business-section-title">Location</h1>
                        <p>{business?.location.address1}</p>
                        <p>{business?.location.city}, {business?.location.state}</p>
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
                <div className="float-scores-and-map">
                    <div className="scores">
                        <h1 className="business-section-title">Scores</h1>
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
                    
                    <div className="bp-map-container">
                        <MapWrapper businesses={[business]} mapOptions={mapOptions}/>
                    </div>
                </div>
                {/* <div>
                    <h1 className="business-section-title">Your notes and photos</h1>
                    <h1 className="business-section-title">What your friends think</h1>
                </div> */}
            </div>
            </div>
            </>
            
    )
};

export default BusinessPage;