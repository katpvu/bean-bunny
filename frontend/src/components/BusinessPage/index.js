import "./index.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { clearListItems, createListItem, deleteListItem } from "../../store/list_items";
import { checkErrors } from '../../utils';
import MapWrapper from "../Map";
import { fetchBusiness, getBusiness } from "../../store/business";
import { fetchRecs, fetchSearches } from "../../store/search";
import ScoresPanel from "./ScoresPanel";
import BusinessHours from "./BusinessHours";
import { Link } from "react-router-dom";
import { clearSearches } from "../../store/search";
import { clearLists, createList, fetchLists, getLists } from "../../store/list";
import { SuperBalls } from '@uiball/loaders'
import { fetchListByTitle } from "../../store/list";
import RatingsIndex from "../Rating/RatingsIndex";
import RatingForm from '../Rating/RatingForm'
import { Modal } from "../../context/Modal";


const BusinessPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    
    const { from } = location.state;
    const { businessId } = useParams();

    const business = useSelector(getBusiness(businessId))
    const sessionUser = useSelector(state => state.session.user); 
    const ratings = useSelector(state => Object.values(state.ratings));
    const recs = useSelector(state => Object.values(state.searches));
    const list = useSelector(state => state.lists)
    const listItems = useSelector(state => Object.values(state.listItems))

    const [currentListItem, setCurrentListItem] = useState(null)
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentUserRating, setCurrentUserRating] = useState({});
    const [saved, setSaved] = useState(false)
    

    useEffect(() =>{
        dispatch(fetchBusiness(businessId))
        dispatch(fetchRecs(businessId))
        return () => {
            // console.log('cleaned up')
            dispatch(clearSearches());
            dispatch(clearLists());
            dispatch(clearListItems())
            setSaved(false)
        }
    }, [dispatch, businessId])

    useEffect(() => {
        dispatch(fetchListByTitle(business?.location?.city))
        setCurrentUserRating(ratings.find(rating => rating.userId === sessionUser.id))
    }, [business])


    // useEffect(() => {
    //     if (listItems.length > 0) {
    //         listItems.forEach((listItem) => {
    //             if (listItem.businessYelpId === businessId) {
    //                 setSaved(true)
    //                 setCurrentListItem(listItem)
    //             }
    //         })
    //     }
    // }, [currentListItem, saved])

    useEffect(() => {
        if (Object.keys(list).length) {
            let listItemBusinesses = Object.values(list.listItemBusinesses)
            if (listItemBusinesses.includes(businessId)) {
                setSaved(true);
                setCurrentListItem(listItems.find(listItem => listItem.businessYelpId === businessId))
            }
        }
    },[list, businessId])

    let mapOptions;
    // useEffect(() => {
        mapOptions = {
            center: {
                lat: business?.coordinates?.latitude,
                lng: business?.coordinates?.longitude
            },
            zoom: 15
        }

    // }, [])

    const handleAddToList = () => {
        if (!Object.keys(list).length){
            dispatch(createList({
                userId: sessionUser.id,
                title: business.location.city
            }, businessId))
            .then(() => setSaved(true))
        } else if (Object.keys(list).length){
            const newListItem = {
                businessYelpId: businessId,
                listId: list.id
            }
            dispatch(createListItem(newListItem))
                .then(() => setSaved(true))
                .then(() => dispatch(fetchListByTitle(business?.location?.city)))
                .catch(async res => {
                    let errors = await checkErrors(res)
                    setErrors(errors)
                })
            }
    }

    const handleRemoveFromList = () => {
        dispatch(deleteListItem(currentListItem.id))
            .then(() => setSaved(false))
            .then(() => setCurrentListItem(null))
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

    const saveButton = () => {
        if (!saved) {
            return (
                <div 
                    className="business-page-save-button"
                    onClick={handleAddToList}
                >save</div>
            )
        } else {
            return (
                <>
                <div className="save-button-container">
                    <p>saved in <Link 
                        to={{pathname: `/lists/${list.id}`, state: {from: `/busineeses/${businessId}`}}}
                        className="bold-and-uppercased">{business?.location?.city}</Link> collection</p>
                    <div 
                        className="business-page-save-button"
                        onClick={handleRemoveFromList}
                    >unsave</div>
                </div>
                </>
            )
        }
    }

    const ratingButton = () => {
        return (
            <>
            <div className="rating-button" 
                onClick={() => setShowModal(true)}
                >{currentUserRating ? "update rating" : "create rating" }
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <RatingForm business={business} 
                    closeModal={() => setShowModal(false)} 
                    setCurrentUserRating={setCurrentUserRating}
                    currentUserRating={currentUserRating}/>
                </Modal>
            )}
            </>
        )
    }

    const businessInfoSection = () => {
        return (
            <>
            <div className="business-info-section-container">
                <div className="business-info-section-container-header">
                    <div>
                        <h1>{business?.name}</h1>
                        {saveButton()}
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
                            <ScoresPanel ratings={ratings} currentUserRating={currentUserRating} currentUser={sessionUser} business={business}/>
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
            </>
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
                        to={{pathname: `/businesses/${rec?.businessYelpId}`, state: {from: `/busineeses/${businessId}`}}}
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
        {!business ? 
            <div className="loader-container">
                <SuperBalls 
                    size={45}
                    speed={1.4} 
                    color="black" 
                    
                /> 
            </div> 
            : null}
        {business ? (
        <div className="business-page-container">
            {headerImages()}
            {businessInfoSection()}
            {RecsPanel()}
            {ratingButton()}
            <RatingsIndex ratings={ratings} />
        </div>
        ) : null}



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