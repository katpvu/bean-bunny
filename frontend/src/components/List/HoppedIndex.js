import { useState } from 'react';
import SortForm from '../SortForm';
import './hopped.css'
import HoppedIndexItem from "./HoppedIndexItem";

const HoppedIndex = ({businesses, ratings}) => {
    const [currentSort, setCurrentSort] = useState("Highest Rating")

    return (
        <>
            <div className="hopped-section-container">
                <h1>Hopped Coffee Shops</h1>
                <SortForm />
                {businesses.map((business, index) => (
                    <HoppedIndexItem business={business} index={index} ratings={ratings} />
                ))}
            </div>
        </>
    )
};
export default HoppedIndex;