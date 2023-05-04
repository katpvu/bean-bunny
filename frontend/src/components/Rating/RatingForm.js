import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRating, deleteRating } from "../../store/ratings";
import BunnyRatingInput from "./BunnyRatingInput";
import { createBusiness } from "../../store/business";
import { useSelector } from "react-redux";
import { updateRating } from "../../store/ratings";


const RatingForm = ({business, closeModal, currentUserRating}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [rating, setRating] = useState(currentUserRating ? currentUserRating?.rating : 0);
    const [notes, setNotes] = useState(currentUserRating ? currentUserRating?.notes : "");
    const [favOrders, setFavOrders] = useState(currentUserRating ? currentUserRating?.favOrders : "");
    const [photoFiles, setPhotoFiles] = useState (currentUserRating ? currentUserRating?.photoUrls : []);

    const handleFiles = ({ currentTarget }) => {
        const files = currentTarget.files;
        setPhotoFiles(Array.from(files));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('rating[rating]', rating);
        formData.append('rating[notes]', notes);
        formData.append('rating[fav_orders]', favOrders);
        formData.append('business_yelp_id', business.id);
        formData.append('rating[user_id]', sessionUser.id);

        if (photoFiles.length !== 0) {
            photoFiles.forEach(photo => {
                formData.append('rating[photos][]', photo);
            });
        };

        if (currentUserRating) {
            formData.append('id', currentUserRating.id);
            dispatch(updateRating(formData));
        } else {
            dispatch(createBusiness(business.id));
            dispatch(createRating(formData));
        }
        closeModal();
    };

    const onChange = (number) => {
        setRating(parseInt(number));
    };

    const handleDelete = () => {
        dispatch(deleteRating(currentUserRating.id));
        closeModal();
    }
    return (
        <div className="rating-form-page-container">
            <div className="banner-display">
                <img src={business?.imageUrl} />
                <div className="fp-overlay"></div>
                <h1>{business?.name}</h1>

            </div>

            <div className="rating-form-container">
                <form>
                    <h1>{currentUserRating ? "Update Your Rating" : "Creating a Rating"}</h1>
                    <label>How would you rate your experience?
                        {/* for rating  */}
                        <BunnyRatingInput 
                            rating={rating} 
                            onChange={onChange}/>
                    </label>

                    <label>Add notes: <br></br>
                        <input type="text"
                        value={notes}
                        placeholder="Drinks are delicious, ambience is perfect"
                        onChange={(e) => setNotes(e.target.value)} />
                    </label>

                    <label>Add your favorite orders:<br></br>
                        {/* for fav orders */}
                        <input type="text"
                        value={favOrders}
                        placeholder="Orange blossom cold brew"
                        onChange={(e) => setFavOrders(e.target.value)} />
                    </label>

                    <label> Upload photos <br></br> 
                        {/* for adding photos */}
                        <input type="file" onChange={handleFiles} multiple />
                    </label>
                    <div className="rating-form-buttons-container">
                        <div onClick={handleSubmit} className="rating-submit-btn">Submit!</div>
                        {currentUserRating && (
                            <div onClick={handleDelete}className="rating-delete-btn">Delete Rating</div>
                        )}
                    </div>
                </form>

            </div>
        </div>
    )
};

export default RatingForm;