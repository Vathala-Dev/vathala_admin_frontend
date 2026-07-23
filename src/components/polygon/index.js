import React, { useState, useRef, useCallback, useEffect } from "react";

import { LoadScript, GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
// import SearchBox from "./search";
import Autocomplete from "react-google-autocomplete";
import { LocationSearchInput } from "./newSearch";



function DrawOnMap({setRegion,setLocation,gotPostalCode,details,disable}) {


  const [path, setPath] = useState(details?.location);


console.log(details?.location,"error");
  const [searchedLocation, setSearchedLocation] = useState({lat:details?.location?.[0].lat,lan:details?.location?.[0]?.lng})
  const [seed, setSeed] = useState(1);
  
  

  console.log(searchedLocation,"searchedLocation");
  console.log(path,"path");


  // useEffect(() => {
  //   setPath(details?.location)
  //   setSearchedLocation({lat:details?.location?.[0].lat,lan:details?.location?.[0]?.lng})
  // }, [details])
  

  useEffect(() => {
    setLocation(path)
  }, [path])
  


  const polygonRef = useRef(null);
  const listenersRef = useRef([]);


  const onEdit = useCallback(() => {

    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map(latLng => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
    }
  }, [setPath]);


  const onLoad = useCallback(
    polygon => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // useEffect(() => {
  //  setPath([{lat:searchedLocation?.lat,lng:searchedLocation?.lan},{lat:searchedLocation?.lat + 2,lng:searchedLocation?.lan + 2},{lat:searchedLocation?.lat - 2,lng:searchedLocation?.lan - 2}])
  // }, [searchedLocation])
  
 
  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach(lis => lis.remove());
    polygonRef.current = null;
  }, []);

  

  function onSelect(value){
    setSearchedLocation({lat:value?.lat,lan:value?.lng})
    setPath([{lat:value?.lat,lng:value?.lng},{lat:value?.lat + 0.01,lng:value?.lng + 0.01},{lat:value?.lat - 0.01,lng:value?.lng - 0.01}])
    setSeed(Math.random());
   
  }
 
  return (
    <div style={{height:"100vh"}} >
 {!disable  &&  <p>Selected Region: {details?.region} </p>}
   {!disable && <LocationSearchInput onSelect={onSelect} gotRegion={value => setRegion(value)} gotPostalCode={value => gotPostalCode(value)} />}
  <GoogleMap
   mapContainerStyle={{height:"100%",width:"100%"}}
          key={seed}
          center={{ lat: searchedLocation?.lat, lng: searchedLocation?.lan }}
          zoom={13}
          version="weekly"
          on
        >
          <Polygon
            // Make the Polygon editable / draggable
            editable
            draggable
            key={seed}
            path={path}
            // Event used when manipulating and adding points
            onMouseUp={onEdit}
            // Event used when dragging the whole Polygon
            onDragEnd={onEdit}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
 
        </GoogleMap>
      
    </div>
  );
}


export default DrawOnMap