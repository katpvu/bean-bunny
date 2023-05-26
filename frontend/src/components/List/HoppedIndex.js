import { useEffect, useState } from 'react';
import SortForm from '../SortForm';
import './hopped.css'
import HoppedIndexItem from "./HoppedIndexItem";
import { useDispatch, useSelector } from 'react-redux';

const HoppedIndex = ({businesses, currentUserRatings}) => {
    const dispatch = useDispatch();
    const [currentSort, setCurrentSort] = useState("Highest Rating");
    const [sortedDescRatings, setSortedDescRatings] = useState(currentUserRatings);

//     let sortedRatings;
//     useEffect(() => {
//         if (currentSort === "Highest Rating") {
//             sortedRatings = currentUserRatings.sort((r1, r2) => 
//                 (r1.rating < r2.rating) ? 1 : (r1.rating > r2.rating) ? -1 : 0
//             )
//             setSortedDescRatings(sortedRatings)
//         }
//     }, [currentUserRatings, currentSort]);

//     useEffect(() => {
//         setSortedDescRatings(sortedDescRatings.reverse())
//    }, [currentSort])

    return (
        <>
            <div className="hopped-section-container">
                <h1>Hopped Coffee Shops</h1>
                <br></br>
                <SortForm setCurrentSort={setCurrentSort}/>
                {sortedDescRatings?.map((rating, index) => (
                    <HoppedIndexItem rating={rating} index={index} businesses={businesses} />
                ))}
            </div>
        </>
    )
};
export default HoppedIndex;