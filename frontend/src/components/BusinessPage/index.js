import "./index.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createListItem } from "../../store/list_items";
import { checkErrors } from '../../utils';
import MapWrapper from "../Map";
import { fetchBusiness, getBusiness } from "../../store/business";
import { fetchRecs, fetchSearches } from "../../store/search";
import ScoresPanel from "./ScoresPanel";
import BusinessHours from "./BusinessHours";
import { Link } from "react-router-dom";
import { clearSearches } from "../../store/search";

const BusinessPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const { from } = location.state;
    const { businessId } = useParams();

    const business = useSelector(getBusiness(businessId))
    const sessionUser = useSelector(state => state.session.user); 
    const ratings = useSelector(state => state.ratings ? Object.values(state.ratings) : []);
    const recs = useSelector(state => state.searches ? Object.values(state.searches) : [])

    const [toggleMenu, setToggleMenu] = useState(false)
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUserRating, setCurrentUserRating] = useState({})
    

    useEffect(() =>{
        // dispatch(fetchLists())
        dispatch(fetchBusiness(businessId))
        dispatch(fetchRecs(businessId))

        return () => {
            // console.log('cleaned up')
            dispatch(clearSearches())
        }
    }, [dispatch, showModal, businessId])

    useEffect(() => {
        console.log(business)
    }, [])

    let mapOptions;
        mapOptions = {
            center: {
                lat: business?.coordinates?.latitude,
                lng: business?.coordinates?.longitude
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

    const headerImages = () => {
        return (
            <div className="images-header-container">
                {business?.additionalPhotosUrls.map((url, i) => (
                    <div key={i} className="bp-header-img-container">
                        <img src={url} alt="coffee" />
                    </div>
                ))}
            </div>
        )
    }

    const businessInfoSection = () => {
        return (
            <div className="business-info-section-container">
                <div className="business-info-section-container-header">
                    <div>
                        <h1>{business?.name}</h1>
                        {/* need to add conditional to check if user has already saved this business */}
                        <div className="business-page-save-button">save</div>
                    </div>
                    <h3>{business?.location?.city}, {business?.location?.state}</h3>
                    <p>{business?.phoneNumber}</p>
                </div>
                <div className="business-info-section-container-details">
                    <div className="business-hours-and-pop-items">
                        <div>
                            <h2>Business hours</h2>
                            <BusinessHours hours={business?.hours}/>
                        </div>
                        <div>
                            <h2>Popular Items</h2>
                        </div>
                    </div>
                    <div className="scores-and-map-container">
                        <div>
                            <h2>Scores</h2>
                            <ScoresPanel ratings={ratings} currentUser={sessionUser} business={business}/>
                        </div>
                        <div>
                            <div className="bp-map-container">
                                <MapWrapper businesses={[business]} mapOptions={mapOptions}/>
                            </div>
                            <h3 className="map-address">{business?.location?.address1}, {business?.location?.city}, {business?.location?.state} {business?.location?.zipCode}</h3>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }

    const RecsPanel = () => {
        return (
            <>
            <h2 className="recs-panel-title">other coffee shops in {business?.location?.city}</h2>
            <div className="recs-panel-container">
                {recs.map((rec, i) => (
                    <Link 
                        className="recs-image-container" 
                        to={{pathname: `/businesses/${rec.businessYelpId}`, state: {from: `/busineeses/${businessId}`}}}
                    >
                        <img src={rec?.imageUrl} alt="rec" />
                        <div className="rec-overlay"></div>
                        <h2>{rec?.name}</h2>
                    </Link>
                ))}

            </div>
            </>
        )
    }

    return (
        <>
        <div className="business-page-container">
            {headerImages()}
            {businessInfoSection()}
            {RecsPanel()}
        </div>
        {/* <div className="business-page-container">
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
                    <div className="buttons-container"> */}
                        {/* <div className="rating-button" 
                            onClick={() => setShowModal(true)}
                            >{currentUserRating ? "Update Rating" : "Create Rating" }
                        </div> */}
                        {/* {showModal && (
                            <Modal onClose={() => setShowModal(false)}>
                                <RatingForm business={business} 
                                closeModal={() => setShowModal(false)} 
                                setCurrentUserRating={setCurrentUserRating}
                                currentUserRating={currentUserRating}/>
                            </Modal>
                        )} */}
                        {/* <div className="add-to-list-button" onClick={handleToggle}>{toggleMenu ? "x" : "+"}</div>
                    </div> */}
                    {/* <ul className={toggleMenu ? "list-index-drop-down" : "hidden"}>
                        <ListDropDown lists={lists} handleAddToList={handleAddToList} />
                    </ul> */}
                {/* </div>
                <br></br>
                <div className="float-scores-and-map"> */}
                    {/* <ScoresPanel businessYelpRating={business?.yelpRating} currentUserRating={currentUserRating} ratings={ratings}/>
                     */}
                    {/* <div className="bp-map-container">
                        <MapWrapper businesses={[business]} mapOptions={mapOptions}/>
                    </div>
                </div> */}


                {/* <hr></hr>
                <div className="ratings-section-bp">
                    <div className="user-notes-section">
                        <UserNotes currentUserRating={currentUserRating} />
                    </div>

                    <div className="other-users-section"> */}
                        {/* <div className="photos-section">
                            <PhotoGallery ratings={ratings} business={business} sessionUser={sessionUser}/>
                        </div> */}
                        <hr></hr>
                        {/* <div>
                            <BeanBunnyMemberNotes ratings={ratings} business={business} sessionUser={sessionUser} />
                        </div> */}
                    {/* </div>
                </div>

            </div>
            </div>
            </> */}
            </>
    )
};

export default BusinessPage;