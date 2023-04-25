const BusinessPage = ({business}) => {
    console.log(business)
    return (
        <div>
            <h1>hello</h1>
            <img src={`${business.imageUrl}`} alt={business.name}/>
            <div>
                
            </div>
        </div>
    )
};

export default BusinessPage;