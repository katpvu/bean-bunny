import { useEffect, useState } from 'react';
import './hopped.css'
import HoppedIndexItem from "./HoppedIndexItem";
import {BsArrowRight} from 'react-icons/bs'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { SuperBalls } from "@uiball/loaders";

const HoppedIndex = ({businesses, currentUserRatings, loaded}) => {
    const history = useHistory();

    const [ratingsByNum, setRatingsByNum] = useState({});
    const [ratingsLoaded, setRatingsLoaded] = useState(false);
    const [currentPreviewId, setCurrentPreviewId] = useState("");

    const sortByRating = () => {
        let ratings = {
            5: [],
            4: [],
            3: [],
            2: [],
            1: []
        };

        currentUserRatings.forEach(rating => {
            ratings[rating.rating].push(rating);
        });
        setRatingsByNum(ratings);
        setRatingsLoaded(true);
    };

    useEffect(() => {
        sortByRating();
    }, [currentUserRatings]);

    const hoppedPreview = () => {
        if (currentPreviewId) {
            return (
                <div id="hopped-preview-container">
                    <div className="preview-left">
                        <div className="preview-left-photo-1">
                            <img 
                                src={currentPreviewId.additionalPhotosUrls[0]} 
                                alt="preview"/>
                        </div>
                        {/* <ScoresPanel /> */}
                    </div>
                    <div className="preview-right">
                        <div>
                            <h2>{currentPreviewId.name}</h2>
                            <h3>{currentPreviewId.location.city}, {currentPreviewId.location.state}</h3>
                            <Link 
                                to={{
                                    pathname: `/businesses/${currentPreviewId.businessYelpId}`,
                                    state: {from: '/hopped'}
                                }}
                                className="view-business-button"
                            >
                                view business <BsArrowRight />
                            </Link>
                        </div>
                        <div className="preview-left-photo-2">
                            <img src={currentPreviewId.additionalPhotosUrls[1]} alt="preview-2" />
                        </div>
                    </div>
                </div>
            )
        } 
    }

    const ifEmptyContent = () => {
        if (Object.keys(businesses).length >= 1) {
            return (
                <div id="hopped-content-container">
                    <div id="hopped-based-on-ratings-container">
                       {ratingsLoaded && 
                       [5, 4, 3, 2, 1].map((numRating, i) => (
                            <HoppedIndexItem 
                                key={i}
                                numRating={numRating} 
                                businesses={businesses}
                                ratings={ratingsByNum[numRating]} 
                                setCurrentPreviewId={setCurrentPreviewId} />
                        ))}
                    </div>
                    {hoppedPreview()}
                </div>
            )
        } else {
            return (
                <div id="empty-hopped" className="full-page">
                <h2 className="empty-collections-text">once you start rating coffee shops, we'll keep track of them here!</h2>
                <div className="start-discovering-btn" onClick={() => history.push("/search")} >start discovering</div>
            </div>
                
            )
        }
    }

    return (
        <>
            <div className="hopped-section-container">
                <h1>Hopped Coffee Shops</h1>
                <p>All the coffee shops that you've rated</p>

                {loaded ?
                    ifEmptyContent()
                    :
                    <div className="loader-container">
                    <SuperBalls 
                        size={45}
                        speed={1.4} 
                        color="black" 
                    /> 
                    </div>
                }
            </div>
        </>
    )
};
export default HoppedIndex;