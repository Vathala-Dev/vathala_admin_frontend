import React, { useState, useRef, useEffect } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import SearchBox from './search'



const Map = withScriptjs(
  withGoogleMap(props => {
    const mapRef = useRef(null)
    const [zoom, setZoom] = useState(4)
    const [center, setCenter] = useState({ lat: -15, lng: -54.645636 })



    const handlePlacesChanged = place => {
      setZoom(16)
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    }

    return (
    <GoogleMap
        zoom={zoom}
        ref={mapRef}
        center={center}
        defaultOptions={props.defaultOptions}
        onDragEnd={() => setCenter(mapRef.current.getCenter())}
        onZoomChanged={() => setZoom(mapRef.current.getZoom())}
      >
        <SearchBox onPlacesChanged={handlePlacesChanged} />
      </GoogleMap>
    )
  }),
)

export default Map
