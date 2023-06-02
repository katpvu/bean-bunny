import { useState } from "react";
import "./index.css"
import { useEffect } from "react";

const BunnyRatingInput = ({rating, onChange, disabled=false}) => {
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
        setActiveRating(rating);
      }, [rating]);

    const setUpBunnyRating = () => {
        return (
            <>
            {[1, 2, 3, 4, 5].map((num, i) => (
                <div key={i} className={activeRating >= num ? "filled" : "empty"}
                    onMouseEnter={()=> {if (!disabled) setActiveRating(num)}}
                    onMouseLeave={() => {if (!disabled) setActiveRating(rating)}}
                    onClick={() => {if (!disabled) onChange(num)}}
                    />
            ))}
            </>
        )
    }

    return (
        <div className="rating-input">
            {setUpBunnyRating()}
        </div>
    )
};

export default BunnyRatingInput;