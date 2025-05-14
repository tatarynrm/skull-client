"use client";
import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";

// Interface for the props
interface IMapProps {
  lat: number;
  lng: number;
}

const MapComponent: React.FC<IMapProps> = ({ lat, lng }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_KEY!, // Replace with your API key
  });

  if (!isLoaded) return <MapSkeleton/>;

  return (
    <GoogleMap
      center={{ lat, lng }}
      zoom={10}
      mapContainerStyle={{
        width: "100%",
        height: "400px",
        borderRadius:"10px"
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

// LocationInfo now expects lat and lng as props
const LocationInfo: React.FC<IMapProps> = ({ lat, lng }) => {
  return <MapComponent lat={lat} lng={lng} />;
};

export default LocationInfo;



const MapSkeleton = () => {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[600] w-[600] " />

    </div>
  )
}


