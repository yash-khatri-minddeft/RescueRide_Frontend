import React from "react";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

const TestMap = () => {
  function onPlaceSelect(value) {
    console.log("onPlaceSelect", value);
  }

  function onSuggectionChange(value) {
    console.log("onSuggectionChange", value);
  }

  return (
    <GeoapifyContext apiKey="6cb680b436174c3b8d84ad8a4adada9a">
      <GeoapifyGeocoderAutocomplete
        skipIcons={true}
        skipDetails={false}
        placeholder="Ubicación"
        placeSelect={onPlaceSelect}
        suggestionsChange={onSuggectionChange}
      />
    </GeoapifyContext>
  );
};

export default TestMap;
