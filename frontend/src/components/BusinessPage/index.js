import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-regular-svg-icons'

const BusinessPage = ({business}) => {
    console.log(business)

    
    return (
        <div>
            <img src={`${business.imageUrl}`} alt={business.name} className="fitting-image"/>
            <div className="bp-header-overlay">
                <h1 className="business-page-title">{business.name}</h1>
            </div>
            <div className="business-info-header">
                <div>
                    <h1 className="business-section-title">Location</h1>
                    <p>{business.location.address1}</p>
                    <p>{business.location.city}, {business.location.state}</p>
                </div>
                <div className="buttons-container">
                    <div className="rating-button">Create Rating</div>
                    <FontAwesomeIcon className="bookmark-button" icon={faBookmark} size="2xl" style={{color: "#919191"}}/>
                </div>
                
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
                    <div className="rating">{business.rating}</div>
                    <div className="rating-info">
                        <h3>Current Yelp Rating</h3>
                        <p>Compare everyone's rating vs. just coffee lovers!</p>
                    </div>
                </div>
            </div>
            
            <h1 className="business-section-title">Photos from Bean Bunny members</h1>
            <div className="photos-container">
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
                <div className="dummy-img"></div>
            </div>
            <h1 className="business-section-title">Your notes and photos</h1>

            <h1 className="business-section-title">What your friends think</h1>
        </div>
    )
};

export default BusinessPage;