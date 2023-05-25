import "./index.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getLists, fetchLists } from "../../store/list";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { createListItem } from "../../store/list_items";
import { checkErrors } from '../../utils';
import MapWrapper from "../Map";
import { fetchBusiness, getBusiness } from "../../store/business";
import { fetchSearches } from "../../store/search";
import Header from "../Header";
import { Modal } from "../../context/Modal"
import RatingForm from "../Rating/RatingForm";
import ScoresPanel from "./ScoresPanel";
import ListDropDown from "./ListDropDown";
import { getBusinessRatings } from "../../store/ratings";
import PhotoGallery from "./PhotoGallery";
import UserNotes from "./UserNotes";
import BeanBunnyMemberNotes from "./BeanBunnyMemberNotes";

const BusinessPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const { from } = location.state;
    const { businessId } = useParams();

    const lists = useSelector(getLists);
    const business = useSelector(getBusiness(businessId))
    const sessionUser = useSelector(state => state.session.user.user);
    const sessionUserRatings = useSelector(state => Object.values(state.session.user.ratings))
    const ratings = useSelector(getBusinessRatings);


    const [toggleMenu, setToggleMenu] = useState(false)
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUserRating, setCurrentUserRating] = useState({})
    

    useEffect(() =>{
        dispatch(fetchLists())
        dispatch(fetchBusiness(businessId))
        
    }, [dispatch, showModal, businessId])

    useEffect(() => {
        
        console.log(sessionUserRatings)
    }, [])

    // useEffect(() => {
    //     console.log(business)
    // }, [business])
    
    useEffect(() => {
        setCurrentUserRating(sessionUserRatings.find(rating => rating.businessYelpId === businessId))
        console.log(currentUserRating)
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

    const handleBackButton = () => {
        if (from?.includes(' ')) {
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
                        <div className="rating-button" 
                            onClick={() => setShowModal(true)}
                            >{currentUserRating ? "Update Rating" : "Create Rating" }
                        </div>
                        {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <RatingForm business={business} 
                                closeModal={() => setShowModal(false)} 
                                setCurrentUserRating={setCurrentUserRating}
                                currentUserRating={currentUserRating}/>
                            </Modal>
                        )}
                        <div className="add-to-list-button" onClick={handleToggle}>{toggleMenu ? "x" : "+"}</div>
                    </div>
                    <ul className={toggleMenu ? "list-index-drop-down" : "hidden"}>
                        <ListDropDown lists={lists} handleAddToList={handleAddToList} />
                    </ul>
                </div>
                <br></br>
                <div className="float-scores-and-map">
                    <ScoresPanel businessYelpRating={business?.yelpRating} currentUserRating={currentUserRating} ratings={ratings}/>
                    
                    <div className="bp-map-container">
                        <MapWrapper businesses={[business]} mapOptions={mapOptions}/>
                    </div>
                </div>

                {/* <br></br> */}
                <hr></hr>
                <div className="ratings-section-bp">
                    <div className="user-notes-section">
                        <UserNotes currentUserRating={currentUserRating} />
                    </div>

                    <div className="other-users-section">
                        <div className="photos-section">
                            <PhotoGallery ratings={ratings} business={business} sessionUser={sessionUser}/>
                        </div>
                        <hr></hr>
                        <div>
                            <BeanBunnyMemberNotes ratings={ratings} business={business} sessionUser={sessionUser} />
                        </div>
                    </div>
                </div>

            </div>
            </div>
            </>
            
    )
};

export default BusinessPage;