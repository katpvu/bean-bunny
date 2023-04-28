import { useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper"
import { useEffect } from "react";
import "./index.css"
import { useMemo } from "react";

// function PostMap({
//     // posts,
//     highlightedPost,
//     mapOptions = {},
//     mapEventHandlers = {}
  
//   }) {
//     const [map, setMap] = useState(null);
//     const mapRef = useRef(null);
//     const markers = useRef({});
  
  
//     // Create the map
//     useEffect(() => {
//       if (!map) {
//         setMap(new window.google.maps.Map(mapRef.current, {
//           center: {
//             lat: 37.773972,
//             lng: -122.431297
//           }, // San Francisco coordinates
//           zoom: 13,
//           clickableIcons: false,
//           ...mapOptions,
//         }));
//       }
//     }, [mapRef, map, mapOptions]);
  
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
  
//     return (
//       <div ref={mapRef} className="map">
//         Map
//       </div>
//     );
//   }
  
//   export default function PostMapWrapper(props) {
//     return (
//       <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
//         <PostMap {...props} />
//       </Wrapper>
//     );
//   }
  

const BeanMap = ({ mapOptions={}, businesses }) => {
    const [map, setMap] = useState(null);
    const mapRef = useRef(null);
    const markers = useRef({});

    useEffect(()=>{
        if (!map) {
            setMap(new window.google.maps.Map(
            mapRef.current, 
            {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8,
            }))
        }
        
    },[mapRef, map]);

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
    },)


    return (
        <div ref={mapRef} id="map"><h1>map</h1></div>
    )
}

const MapWrapper = ({businesses}) => {
    // const render = (status) => {
    //     switch (status) {
    //       case Status.LOADING:
    //         return <div>Loading...</div>
    //       case Status.FAILURE:
    //         return <div>ERROR</div>
    //       case Status.SUCCESS:
    //         return <BeanMap />;
    //     }
    //   };
    return (
        <>
            <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} >
                <BeanMap businesses={businesses}/>
            </Wrapper> 
        </>
    )
}

export default MapWrapper