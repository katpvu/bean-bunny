const PhotoGallery = ({ratings, sessionUser}) => {
    let imageUrls = []
    ratings.forEach(rating => {
        if (rating.userId !== sessionUser.id) imageUrls.push(rating?.photoUrls)
    });
    
    return (
        <>
            <h1 className="business-section-title">Photos from Bean Bunny members</h1>
            <ul className="photo-gallery">
                {imageUrls.map(image => (
                    <li>
                        <img src={image} />
                    </li>
                ))}
            </ul>
        </>
    )
};

export default PhotoGallery;