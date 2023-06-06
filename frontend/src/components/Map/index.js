import { useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper"
import { useEffect } from "react";
import "./index.css"
import coffeeIcon from "../../assets/cc-marker.png"

const BeanMap = ({ 
    mapOptions={}, 
    businesses, 
    mapEventHandlers, 
    markerEventHandlers={},
}) => {

    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});

    useEffect(()=>{
        setMap(new window.google.maps.Map(
        mapRef.current, 
        {
            center: { lat: 37.7749, lng: -122.4194 },
            zoom: 12,
            ...mapOptions
        }));
    },[mapRef, mapOptions, markers]);


    const icon = {
        url: coffeeIcon, // url
        scaledSize: new window.google.maps.Size(40, 40), // scaled size
        origin: new window.google.maps.Point(0,0), // origin
        anchor: new window.google.maps.Point(0, 0) // anchor
    };


    // for every business that pops up on the page, render markers or remove markers
    let businessIds = []
    useEffect(()=>{
        if (businesses) {
        businesses.forEach(business => {
            if (!markers[business?.businessYelpId]) {
                // create new marker for business
                let marker = new window.google.maps.Marker({
                    position: {
                        lat: business?.coordinates?.latitude,
                        lng: business?.coordinates?.longitude
                    },
                    map: map,
                    icon: icon
                });

                // add info window for each business marker
                const contentString = 
                    `<div class="tooltip-container">` +
                        `<img src=${business?.imageUrl} />` + 
                        `<h1>${business?.name}</h1>` +
                    
                    `</div>`

                let infoWindow = new window.google.maps.InfoWindow({
                    content: contentString
                });

                marker.addListener('mouseover', () => infoWindow.open(map, marker))
                marker.addListener('mouseout', () => infoWindow.close());

                // add event handlers to each marker
                Object.entries(markerEventHandlers).forEach(([event, handler]) => {
                    marker.addListener(event, () => handler(business));
                });

                // add marker to markers ref
                markers.current[business?.businessYelpId] = marker;
                businessIds.push(business?.businessYelpId);
            };
        });
        };
    }, [map, markers, businesses, markerEventHandlers]);

    useEffect(() => {
        let markerKeys = Object.keys(markers.current)        
        markerKeys.forEach(markerKey => {
            if (!businessIds.includes(markerKey)) {
                markers.current[markerKey].setMap(null)
            }
        });
    }, [businesses])


    return (
    <div ref={mapRef} id="map"><h1>map</h1></div>
    );
};

const MapWrapper = ({businesses, mapOptions, mapEventHandlers, markerEventHandlers}) => {
    return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} >
        <BeanMap 
            businesses={businesses} 
            mapOptions={mapOptions} 
            mapEventHandlers={mapEventHandlers} 
            markerEventHandlers={markerEventHandlers}/>
    </Wrapper> 
    );
};
export default MapWrapper;