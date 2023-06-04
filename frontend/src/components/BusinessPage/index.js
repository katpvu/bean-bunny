import "./index.css"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { clearListItems } from "../../store/list_items";
import MapWrapper from "../Map";
import { clearBusinesses, fetchBusiness, getBusiness } from "../../store/business";
import { fetchRecs, fetchSearches } from "../../store/search";
import ScoresPanel from "./ScoresPanel";
import BusinessHours from "./BusinessHours";
import { clearSearches } from "../../store/search";
import { clearLists, fetchListByTitle } from "../../store/list";
import { SuperBalls } from '@uiball/loaders'
import RatingsIndex from "../Rating/RatingsIndex";
import RatingForm from '../Rating/RatingForm'
import { Modal } from "../../context/Modal";
import SaveButton from "./SaveButton";
import RecsPanel from "./RecsPanel";
import PopularItems from "./PopularItems";
import { restoreSession } from "../../store/session";

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

    const [currentListItem, setCurrentListItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentUserRating, setCurrentUserRating] = useState({});
    const [saved, setSaved] = useState(false);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch])

    useEffect(() =>{
        dispatch(fetchBusiness(businessId))
            .then(() => setLoaded(true))
        dispatch(fetchRecs(businessId))
        return () => {
            dispatch(clearBusinesses());
            dispatch(clearSearches());
            dispatch(clearLists());
            dispatch(clearListItems())
            setSaved(false)
        }
    }, [dispatch, businessId])

    useEffect(() => {
        if (business) {
            dispatch(fetchListByTitle(business?.location?.city))
        }
        if (sessionUser) {
            setCurrentUserRating(ratings.find(rating => rating.userId === sessionUser.id))
        }
    }, [business])


    useEffect(() => {
        if (list && loaded) {
            if (Object?.keys(list).length > 0){
            let listItemBusinesses = Object?.values(list.listItemBusinesses)
            if (listItemBusinesses.includes(businessId)) {
                setSaved(true);
                setCurrentListItem(listItems.find(listItem => listItem.businessYelpId === businessId))
            }}
        }
    },[list, businessId])

    let mapOptions;
    mapOptions = {
        center: {
            lat: business?.coordinates?.latitude,
            lng: business?.coordinates?.longitude
        },
        zoom: 15
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
        if (business?.additionalPhotosUrls) {
            return (
                <div className="images-header-container">
                    {business?.additionalPhotosUrls.map((url, i) => (
                        <div key={i} className="bp-header-img-container">
                            <img src={url} alt="coffee" />
                        </div>
                    ))}
                </div>
            )
        } else if (!business?.additionalPhotosUrls) {
            return (
                <div className="images-header-container-2">
                    <div className="bp-header-img-container">
                    <img src={business?.imageUrl} alt="coffee" />
                    </div>
                </div>
            )
        }
    }


    const handleOpenRatingButton = () => {
        if (sessionUser === null) return history.push("/login");
        setShowModal(true)
    }

    const ratingButton = () => {
        return (
            <>
            <div className="rating-button" 
                onClick={handleOpenRatingButton}
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
                        <SaveButton saved={saved} 
                            setSaved={setSaved} 
                            history={history} 
                            list={list} 
                            sessionUser={sessionUser}
                            business={business} 
                            businessId={businessId} 
                            currentListItem={currentListItem}
                            setCurrentListItem={setCurrentListItem}/>
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
                            <PopularItems ratings={ratings}/>
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

    return (
        <>
        {loaded 
        ? (
        <div className="business-page-container">
            {headerImages()}
            {businessInfoSection()}
            <RecsPanel 
                business={business}
                businessId={businessId}
                recs={recs}
            />
            {ratingButton()}
            <RatingsIndex ratings={ratings} />
        </div> ) 
        : (
        <div className="loader-container">
        <SuperBalls 
            size={45}
            speed={1.4} 
            color="black" 
            
        /> 
        </div> ) }
        </>
    )
};

export default BusinessPage;