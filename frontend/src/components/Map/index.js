import { useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper"
import { useEffect } from "react";
import "./index.css"
  
//     // Add event handlers to map
//     useEffect(() => {
//       if (map) {
//         const listeners = Object.entries(mapEventHandlers).map(([event, handler]) =>
//           window.google.maps.event.addListener(
//             map,
//             event,
//             (...args) => handler(...args, map)
//           )
//         );
  
//         return () => listeners.forEach(window.google.maps.event.removeListener);
//       }
//     }, [map, mapEventHandlers]);
  
//     // Change the style for post marker on hover
//     useEffect(() => {
//       Object.entries(markers.current).forEach(([postId, marker]) => {
//         const label = marker.getLabel();
//         const icon = marker.getIcon();
  
//         if (parseInt(postId) === highlightedPost) {
//           marker.setLabel({ ...label, color: 'white' });
//           marker.setIcon({ ...icon, fillColor: 'black' });
//         } else {
//           marker.setLabel({ ...label, color: 'black' });
//           marker.setIcon({ ...icon, fillColor: 'white' });
//         }
//       });
//     }, [markers, highlightedPost]);

  

const BeanMap = ({ mapOptions={}, businesses }) => {
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
            }))
        
    },[mapRef, mapOptions, markers]);

    useEffect(() => {
        let markerKeys = Object.keys(markers.current)        
        console.log(markerKeys, "keys")
        markerKeys.forEach(markerKey => {
            if (!businessIds.includes(markerKey)) {
                console.log(markers.current[markerKey], "marker object")
                markers.current[markerKey].setMap(null)
            }
        });
    }, [businesses])

    // for every business that pops up on the page, render markers or remove markers
    let businessIds = []
    useEffect(()=>{
        businesses.forEach(business => {
            if (!markers[business.id]) {
                let markerOptions = {
                    position: {
                        lat: business.coordinates.latitude,
                        lng: business.coordinates.longitude
                    },
                    map: map
                };
                markers.current[business.id] = new window.google.maps.Marker(markerOptions)
            };
            businessIds.push(business.id)
        });
    }, [map, markers, businesses])


    return (
        <div ref={mapRef} id="map"><h1>map</h1></div>
    );
};

const MapWrapper = ({businesses, mapOptions}) => {
    return (
        <>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} >
                <BeanMap businesses={businesses} mapOptions={mapOptions}/>
            </Wrapper> 
        </>
    );
};
export default MapWrapper;