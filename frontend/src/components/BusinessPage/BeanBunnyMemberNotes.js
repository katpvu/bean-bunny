import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const BeanBunnyMemberNotes = ({ratings, sessionUser, business}) => {
    const dispatch = useDispatch();
    const users = useSelector(state => Object.values(state.users))

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    let beanBunnyUsersRatings = [];
    ratings.forEach(rating => {
        if (rating?.userId !== sessionUser?.id && rating.businessYelpId === business?.id) {
            console.log(rating)
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
            <h1 className="business-section-title">Bean Bunny Member's Notes</h1>
            <div className="current-user-notes">
                {beanBunnyUsersRatings.map(user => (
                    <div className="input-notes-container">
                        <h1>{findUser(user.userId)?.username}</h1>
                            <div className="notes-orders">
                                <h2>Notes:</h2>
                                <p>{user?.notes}</p>
                                <br></br>
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