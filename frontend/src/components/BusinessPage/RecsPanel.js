import { Link } from "react-router-dom";

const RecsPanel = ({
    business,
    recs,
    businessId
}) => {
    return (
        <>
            <h2 className="recs-panel-title">
                other coffee shops in {business?.location?.city}
            </h2>
            <div className="recs-panel-container">
                {recs.map((rec, i) => (
                    <Link 
                        key={i}
                        className="recs-image-container" 
                        to={{pathname: `/businesses/${rec?.businessYelpId}`, state: {from: `/businesses/${businessId}`}}}
                    >
                        <img src={rec?.imageUrl} alt="rec" />
                        <div className="rec-overlay"></div>
                        <h2>{rec?.name}</h2>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default RecsPanel;