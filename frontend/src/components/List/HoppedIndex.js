import './hopped.css'
import HoppedIndexItem from "./HoppedIndexItem";

const HoppedIndex = ({businesses, ratings}) => {

    return (
        <>
            <div className="hopped-section-container">
                <h1>Hopped Coffee Shops</h1>
                {businesses.map((business, index) => (
                    <HoppedIndexItem business={business} index={index} ratings={ratings} />
                ))}
            </div>
        </>
    )
};
export default HoppedIndex;