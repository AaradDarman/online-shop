import React, { useEffect, useState } from "react";

import axios from "axios";

import { mapContext } from "./map-context";
import { useDebounce } from "components/hooks/useDebounce";

const MapContext = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState([28.946301, 53.647447]);
  const [map, setMap] = useState(null);
  const [postalAddress, setPostalAddress] = useState("");
  const [city, setCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [postalCode, setPostalCode] = useState("");
  const [plaque, setPlaque] = useState("");

  const [receiverFName, setReceiverFName] = useState("");
  const [receiverLName, setReceiverLName] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleChangeView = (item) => {
    setMapCenter([item.location.y, item.location.x]);
    map.flyTo([item.location.y, item.location.x], 15);
    setSearchResults([]);
    setSearchTerm("");
  };

  let debouncedSeasrchTerm = useDebounce(searchTerm, 500);

  const fetchSearch = async () => {
    try {
      const { status, data } = await axios.get(
        `https://api.neshan.org/v1/search?term=${debouncedSeasrchTerm}&lat=28.946301&lng=53.647447`,
        { headers: { "Api-Key": "service.20b60d22d9f74424a6f43ac927e1d20c" } }
      );
      setSearchResults(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const findAddress = async () => {
    try {
      const { status: statesStatus, data: statesData } = await axios.get(
        `https://iran-locations-api.vercel.app/api/v1/states`
      );
      const fetchStates = statesData.map(({ name: label, ...others }) => ({
        label: `استان ${label}`,
        ...others,
      }));
      setStates(fetchStates);
      const { status, data } = await axios.get(
        `https://api.neshan.org/v4/reverse?lat=${mapCenter[0]}&lng=${mapCenter[1]}`,
        { headers: { "Api-Key": "service.f3c46cc4da694847a5823082da38fed6" } }
      );
      setPostalAddress(data.formatted_address);
      setAddressState({ label: data.state });
      setCity({ label: data.city });
    } catch (error) {
      console.log(error);
    }
  };

  const getCities = async () => {
    try {
      let splitStateString = addressState?.label?.replace("استان ", "");
      const { status, data } = await axios.get(
        `https://iran-locations-api.vercel.app/api/v1/cities?state=${splitStateString}`
      );
      const fetchCities = data.cities.map(({ name: label, ...others }) => ({
        label,
        ...others,
      }));
      setCities(fetchCities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (addressState != "") getCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressState]);

  useEffect(() => {
    fetchSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSeasrchTerm]);

  return (
    <mapContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        handleChangeSearch,
        searchResults,
        setSearchResults,
        mapCenter,
        setMapCenter,
        handleChangeView,
        map,
        setMap,
        findAddress,
        postalAddress,
        setPostalAddress,
        city,
        setCity,
        addressState,
        setAddressState,
        states,
        cities,
        receiverFName,
        setReceiverFName,
        receiverLName,
        setReceiverLName,
        receiverPhone,
        setReceiverPhone,
        postalCode,
        setPostalCode,
        plaque,
        setPlaque,
      }}
    >
      {children}
    </mapContext.Provider>
  );
};

export default MapContext;
