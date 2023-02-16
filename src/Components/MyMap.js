import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '600px',
};

const center = {
  lat: 19.42847,
  lng: -99.12766,
};

const onLoad = (marker) => {
  console.log('marker: ', marker);
};

function MyComponent() {
  const [stores, setStores] = useState([]);
  const [favorites, setFavorites] = useState([]);

  console.log(favorites);

  useEffect(() => {
    fetch('./data.json', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setStores(data));
  }, []);

  function favoriteStore(storeAdded) {
    setFavorites((prevItem) => {
      return [...prevItem, storeAdded];
    });
  }

  const marks = stores.map((store) => {
    const myLat = parseFloat(store.lat);
    const myLong = parseFloat(store.long);
    const position = {
      lat: myLat,
      lng: myLong,
    };
    return (
      <MarkerF
        key={store.id}
        store={store}
        position={position}
        onLoad={onLoad}
        onClick={() => favoriteStore(store)}
      />
    );
  });

  const listOfFav = favorites.map((fav) => {
    return <li key={fav.id + 'tienda'}>Tienda : {fav.address}</li>;
  });

  return (
    <LoadScript googleMapsApiKey="AIzaSyCVH8e45o3d-5qmykzdhGKd1-3xYua5D2A">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {marks}
      </GoogleMap>
      <h3>Mis tiendas favoritas</h3>
      <ul>{listOfFav}</ul>
    </LoadScript>
  );
}

export default React.memo(MyComponent);
