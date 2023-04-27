import "./index.css"
import { Modal } from "../../context/Modal";
import { useState } from "react";
import BusinessPage from "../BusinessPage";

const SearchResultItem = ({business}) => {
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true)
    }
    return (
        <>
            <div onClick={handleShowModal} className="search-item-container">
                <img src={`${business.imageUrl}`} alt={business.name} className="item-img"/>
                <div className="search-item-info">
                    <h1 className="search-business-name">{business.name}</h1>
                    <p>{business.location.address1}</p>
                </div>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <BusinessPage business={business} />
                </Modal>
            )}
        </>
    )
};

export default SearchResultItem