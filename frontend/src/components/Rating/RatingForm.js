import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRating, deleteRating } from "../../store/ratings";
import BunnyRatingInput from "./BunnyRatingInput";
import { checkErrors } from "../../utils";
import { useSelector } from "react-redux";
import { updateRating } from "../../store/ratings";
import { fetchBusiness, getBusiness } from "../../store/business";
import {IoIosRemoveCircle} from "react-icons/io"

const RatingForm = ({business, closeModal, setCurrentUserRating, currentUserRating}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [rating, setRating] = useState(currentUserRating ? currentUserRating?.rating : 0);
    const [notes, setNotes] = useState(currentUserRating ? currentUserRating?.notes : "");
    const [favOrders, setFavOrders] = useState(currentUserRating ? currentUserRating?.favOrders : "");
    const [photoFiles, setPhotoFiles] = useState ([]);
    const [currentPhotoFiles, setCurrentPhotoFiles] = useState(currentUserRating ? currentUserRating.photoUrls : [])
    const [errors, setErrors] = useState([]);



    useEffect(() => {
        // console.log(photoFiles)
    }, [currentUserRating])

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('rating[rating]', rating);
        formData.append('rating[notes]', notes);
        formData.append('rating[fav_orders]', favOrders);
        formData.append('business_yelp_id', business.businessYelpId);
        formData.append('rating[user_id]', sessionUser.id);

        if (photoFiles.length !== 0) {
            photoFiles.forEach(photo => {
                formData.append('rating[photos][]', photo);
            });
        };

        if (currentUserRating) {
            formData.append("id", currentUserRating.id);
            dispatch(updateRating(formData))
            .then(() => dispatch(fetchBusiness(business.businessYelpId)))
            .then(() => closeModal())
        } else {
            console.log(formData.get('rating[photos][]'), "hi")
            dispatch(createRating(formData))
                .then(() => dispatch(fetchBusiness(business.businessYelpId)))
                .then(() => closeModal())
                .catch(async res => {
                    let errors = await checkErrors(res)
                    setErrors(errors)
                })
        }
    };

    const onChange = (number) => {
        setRating(parseInt(number));
    };

    const handleDelete = () => {
        dispatch(deleteRating(currentUserRating.id));
        setCurrentUserRating(null)
        closeModal();
    }

    const handleFiles = async ({currentTarget}) => {
        console.log("hi")
        const files = currentTarget.files;
        setPhotoFiles(Array.from(files));
        if (files.length !== 0) {
            let filesLoaded = 0;
            const urls = [];
            Array.from(files).forEach((file, index) => {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                urls[index] = fileReader.result;
                if (++filesLoaded === files.length)
                  setCurrentPhotoFiles(currentPhotoFiles.concat(urls));
              }
            });
          }
          else setCurrentPhotoFiles([]);
          console.log(photoFiles)
    };


    return (
        <div className="rating-form-page-container">
            <div className="banner-display">
                <img src={business?.imageUrl} alt={business?.imageUrl}/>
                <div className="fp-overlay"></div>
                <h1>{business?.name}</h1>
            </div>

            <div className="rating-form-container">
                <form>
                    <h1>{currentUserRating ? "Update Your Rating" : "Creating a Rating"}</h1>
                    <ul>
                        {errors.map(error => <li key={error} className="error-message">{error}</li>)}
                    </ul>
                    <label>How would you rate your experience?
                        {/* for rating  */}
                        <BunnyRatingInput 
                            rating={rating} 
                            onChange={onChange}/>
                    </label>

                    <label>Add notes:
                        <input type="text"
                        value={notes}
                        placeholder="Drinks are delicious, ambience is perfect"
                        onChange={(e) => setNotes(e.target.value)} />
                    </label>

                    <label>Add your favorite orders:
                        {/* for fav orders */}
                        <input type="text"
                        value={favOrders}
                        placeholder="Orange blossom cold brew"
                        onChange={(e) => setFavOrders(e.target.value)} />
                    </label>

                    <label className="photos-upload-label">Upload Photos 
                        {/* for adding photos */}
                        <input type="file" onChange={handleFiles} multiple />
                    </label>
                    <div className="review-photo-gallery">
                    {currentPhotoFiles.map((url, i) => (
                        <div key={i} className="search-item-img-container">
                            <img src={url} className="item-img" alt="review"/>
                            <IoIosRemoveCircle className="remove-img-button" size={20}/>
                        </div>
                    ))}
                    </div>

                    <div className="rating-form-buttons-container">
                        <div onClick={handleSubmit} className="rating-submit-btn">submit</div>
                        <div onClick={() => closeModal()}className="rating-submit-btn">cancel</div>
                        {currentUserRating && (
                            <div onClick={handleDelete} className="rating-delete-btn">Delete Rating</div>
                        )}
                    </div>
                </form>

            </div>
        </div>
    )
};

export default RatingForm;