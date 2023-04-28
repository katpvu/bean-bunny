import { useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper"
import { useEffect } from "react";


const BeanMap = ({ mapOptions={}, businesses }) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef();
    const markers = useRef();

    useEffect(()=>{
        setMap(new window.google.maps.Map(
            mapRef, 
            {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            }))
    }, []);

    useEffect(()=>{
        businesses.forEach(business => {
            if (!markers[business.id]) {
                let latLng = {
                    lat: business.coordinates.latitude,
                    lng: business.coordinates.longitude
                }
                markers[business.id] = new window.google.maps.Marker({
                    position: latLng,
                    title: business.name,
                    map
                })
            }
        })
    })

    return (
        <div>
            {map}
        </div>
    )
}

const MapWrapper = ({businesses}) => {
    return (
        <>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
                <BeanMap businesses={businesses}/>
            </Wrapper> 
        </>
    )
}

export default MapWrapper