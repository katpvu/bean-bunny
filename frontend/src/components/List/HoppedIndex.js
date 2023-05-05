import { useEffect, useState } from 'react';
import SortForm from '../SortForm';
import './hopped.css'
import HoppedIndexItem from "./HoppedIndexItem";
import { useSelector } from 'react-redux';

const HoppedIndex = ({businesses, ratings}) => {
    const [currentSort, setCurrentSort] = useState("Highest Rating");
    const [sortedBusinesses, setSortedBusinesses] = useState([])

    const sessionUser = useSelector(state => state.session.user);
    
    let currentUserRatings = []
    ratings.forEach(rating => {
        if (rating.userId === sessionUser.id) currentUserRatings.push(rating) 
    })

    // sort users ratings 
    const sortedRatings = currentUserRatings.sort((r1, r2) => 
        (r1.rating < r2.rating) ? 1 : (r1.rating > r2.rating) ? -1 : 0
    )

    // loop through ratings and check if business IDs match, push business into array
    let sortedDescBusinesses = [];
    sortedRatings.forEach(rating => {
        businesses.forEach(business => {
            if (rating.businessYelpId === business.id) sortedDescBusinesses.push(business)
        })
    })

    useEffect(() => {
        // get current user's ratings
        if (currentSort === "Highest Rating") {
            setSortedBusinesses(sortedDescBusinesses)
        } else if (currentSort === "Lowest Rating") {
            setSortedBusinesses(sortedDescBusinesses.reverse())
        }
   }, [currentSort])

    return (
        <>
            <div className="hopped-section-container">
                <h1>Hopped Coffee Shops</h1>
                <br></br>
                <SortForm setCurrentSort={setCurrentSort}/>
                {sortedBusinesses?.map((business, index) => (
                    <HoppedIndexItem business={business} index={index} ratings={ratings} />
                ))}
            </div>
        </>
    )
};
export default HoppedIndex;