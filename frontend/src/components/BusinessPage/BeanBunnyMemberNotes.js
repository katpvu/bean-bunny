import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BunnyRatingInput from "../Rating/BunnyRatingInput";

const BeanBunnyMemberNotes = ({ratings, sessionUser, business}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => Object.values(state.users))

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    let beanBunnyUsersRatings = [];
    ratings.forEach(rating => {
        if (rating?.userId !== sessionUser?.id && rating.businessYelpId === business?.id) {
            beanBunnyUsersRatings.push(rating)
        }
    })
    
    const findUser = (userId) => {
        let user;
        users.forEach(user1 => {
            if (user1?.id === userId) user = user1
        })
        return user
    }

    return (
        <>
            <h1 className="business-section-title">Thoughts from other Bean Bunny Users</h1>
            <div className="current-user-notes">
                {beanBunnyUsersRatings.map(user => (
                    <div className="input-notes-container">
                        <div className="rating-input">
                            <div className={user?.rating >= 1 ? "filled-small" : "empty-small"}/>
                            <div className={user?.rating >= 2 ? "filled-small" : "empty-small"}/>
                            <div className={user?.rating >= 3 ? "filled-small" : "empty-small"}/>
                            <div className={user?.rating >= 4 ? "filled-small" : "empty-small"}/>
                            <div className={user?.rating >= 5 ? "filled-small" : "empty-small"}/>
                        </div>
                        <h1>{user?.notes}</h1>
                        <p>{findUser(user.userId)?.username}</p>
                        <div className="notes-orders">
                            <h2>Favorite Orders:</h2>
                            <p>{user?.favOrders}</p>
                        </div>
         
                    </div>
                ))}
       
            </div>
        </>
    )
};
export default BeanBunnyMemberNotes;