import './hopped.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
const HoppedIndexItem = ({numRating, ratings, businesses, setCurrentPreviewId}) => {

    return (
        <div className="hopped-rating-list-container">
            <div>{numRating}</div>
            <ul>
                {ratings?.map((rating, i) => (
                    <li 
                        onClick={() => setCurrentPreviewId(businesses.find(business => business.businessYelpId === rating.businessYelpId))}
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