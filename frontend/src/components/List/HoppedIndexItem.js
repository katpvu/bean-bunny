import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './hopped.css'
import { useEffect, useState } from 'react';

const HoppedIndexItem = ({numRating, ratings, businesses, setCurrentPreviewId}) => {

    const [windowWidth, setWindowWidth] = useState();
    const history = useHistory();

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        function handleResize(e) {
        setWindowWidth(window.innerWidth);
        }
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const handleClick = (businessYelpId) => {
        if (windowWidth <= 784) {
            return history.push(`/businesses/${businessYelpId}`)
        } else {
            return setCurrentPreviewId(businesses.find(business => business.businessYelpId === businessYelpId))
        }
    }

    return (
        <div className="hopped-rating-list-container">
            <div>{numRating}</div>
            <ul>
                {ratings?.map((rating, i) => (
                    <li 
                        onClick={() => handleClick(rating.businessYelpId)}
                        key={i}
                    >
                        {rating.businessName}
                    </li>
                ))}
            </ul>
        </div>
       
    );
};

export default HoppedIndexItem;