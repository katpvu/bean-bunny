import { useEffect, useState } from 'react';
import SortForm from '../SortForm';
import './hopped.css'
import HoppedIndexItem from "./HoppedIndexItem";
import { useDispatch, useSelector } from 'react-redux';
import ScoresPanel from '../BusinessPage/ScoresPanel';
import {BsArrowRight} from 'react-icons/bs'
import { Link } from 'react-router-dom';

const HoppedIndex = ({businesses, currentUserRatings}) => {
    const [ratingsByNum, setRatingsByNum] = useState({});
    const [ratingsLoaded, setRatingsLoaded] = useState(false);
    const [currentPreviewId, setCurrentPreviewId] = useState("");
    const [currentPreviewBusiness, setCurrentPreviewBusiness] = useState({});

    // useEffect(() => {
        // console.log(Object.values(businesses.currentPreviewId))\
        // console.log(businesses)
        // setCurrentPreviewBusiness(businesses.find(business => business.businessYelpId === currentPreviewId))
        // setCurrentPreviewBusiness(businesses.currentPreviewId);
    //     console.log(currentPreviewBusiness, "clicking preview")
    // }, [currentPreviewId])

    const sortByRating = () => {
        let ratings = {
            5: [],
            4: [],
            3: [],
            2: [],
            1: []
        }

        currentUserRatings.forEach(rating => {
            ratings[rating.rating].push(rating)
        });
        setRatingsByNum(ratings);
        setRatingsLoaded(true);
    };

    useEffect(() => {
        sortByRating();
    }, [currentUserRatings])

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
        } else {
            // console.log("empty")
        }
    }

    return (
        <>
            <div className="hopped-section-container">
                <h1>Hopped Coffee Shops</h1>
                <p>All the coffee shops that you've rated</p>

                <div id="hopped-content-container">
                    <div id="hopped-based-on-ratings-container">
                       {ratingsLoaded && 
                       [5, 4, 3, 2, 1].map((numRating, i) => (
                            <HoppedIndexItem 
                                numRating={numRating} 
                                businesses={businesses}
                                ratings={ratingsByNum[numRating]} 
                                setCurrentPreviewId={setCurrentPreviewId} />
                        ))}
                    </div>
                    {hoppedPreview()}
                </div>
            </div>
        </>
    )
};
export default HoppedIndex;