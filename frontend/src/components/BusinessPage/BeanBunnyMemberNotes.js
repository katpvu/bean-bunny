const BeanBunnyMemberNotes = ({ratings, sessionUser}) => {
    let beanBunnyUsersRatings = [];
    ratings.forEach(rating => {
        if (rating.userId !== sessionUser.id) beanBunnyUsersRatings.push(rating)
    })

    return (
        <>
            <h1>Bean Bunny Member's Notes</h1>
            <div className="current-user-notes">
                {beanBunnyUsersRatings.map(user => (
                    <div className="input-notes-container">
                        <h1>{user.userId}</h1>
                        <div>
                            <h2>Notes:</h2>
                            <p>{user.notes}</p>

                        </div>
                        <div>
                            <h2>Favorite Orders:</h2>
                            <p>{user.favOrders}</p>

                        </div>
                    </div>
                ))}
       
            </div>
        </>
    )
};
export default BeanBunnyMemberNotes;