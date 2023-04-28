import "./index.css"
import { Modal } from "../../context/Modal";
import { useState } from "react";
import BusinessPage from "../BusinessPage";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SearchResultItem = ({business}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true)
    }


    return (
        <>
            <div onClick={handleShowModal} className="search-item-container">
                {/* <div className="search-item-container"> */}
                    <img src={`${business?.imageUrl}`} alt={business?.name} className="item-img"/>
                    <div className="search-item-info">
                        <h1 className="search-business-name">{business?.name}</h1>
                        <p>{business?.location.address1}</p>
                    </div>
                {/* </div> */}
            </div>
            {showModal && (
                <div className="business-page-whole-screen-container">
                    <Modal onClose={() => setShowModal(false)}>
                        <BusinessPage business={business} />

                    </Modal>

                </div>
            )}
        </>
    )
};

export default SearchResultItem