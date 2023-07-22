const PopularItems = ({ratings}) => {
    if (ratings.length) {
        return (
            <>
            {ratings.map((rating, i) => {
                if (i < 5) return (
                <li key={i} className="pop-items-list">
                    {rating.favOrders}
                </li>
            )})}
            </>
        );
    } else {
        return (
            <p>User's favorite orders will be listed here! Currently there are 0 reviews, be the first to add to this list by sharing your favorite order!</p>
        )
    }
};

export default PopularItems;