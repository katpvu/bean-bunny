const PopularItems = ({ratings}) => {

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
};

export default PopularItems;