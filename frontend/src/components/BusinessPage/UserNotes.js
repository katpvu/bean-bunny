const UserNotes = ({currentUserRating}) => {
    // let currentUserNotes;
    // ratings.forEach(rating => {
    //     if (rating.userId === sessionUser.id) currentUserNotes = rating
    // })

    return (
        <>
            <h1>Your notes and photos</h1>
            <div className="current-user-notes">
                <div className="input-notes-container">
                    <div>
                        <h2>Notes:</h2>
                        <p>{currentUserRating?.notes ? currentUserRating?.notes : "You currently don't have any notes"}</p>

                    </div>
                    <div>
                        <h2>Favorite Orders:</h2>
                        <p>{currentUserRating?.favOrders ? currentUserRating?.favOrders : "You currently don't have any favorite orders"}</p>

                    </div>
                </div>

                <h2>Your photos</h2>
                <ul className="photo-gallery">
                    {currentUserRating?.photoUrls && (
                        currentUserRating?.photoUrls.map(photo => (
                            <li>
                                <img src={photo}/>
                            </li>
                        ))
                    )       
                    }
                </ul>

            </div>
        </>
    )
};
export default UserNotes