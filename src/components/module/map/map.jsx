import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker /*, MarkerClusterer */,
} from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import "../../../stylesheet/map.css";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";

const Map = () => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_APIKEY,
  });

  const [map, setMap] = useState(null);
  const [tmp, setTmp] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(11);
  const [center, setCenter] = useState({ lat: 22.483364, lng: 114.139587 });

  const homeHK = useMemo(() => ({ lat: 22.483364, lng: 114.139587 }), []);
  const homeMY = useMemo(() => ({ lat: 2.970399, lng: 101.659614 }), []);
  const homeUK = useMemo(() => ({ lat: 53.3943374, lng: -2.6068253 }), []);
  const locations = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ];

  const onLoad = React.useCallback(function callback(map) {
    boundByHome(map);
    setMap(map);
    setGoogleMapMarkers(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const boundByHome = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    /*bounds.extend(new window.google.maps.LatLng(homeHK));
    bounds.extend(new window.google.maps.LatLng(homeMY));*/
    bounds.extend(homeHK);
    bounds.extend(homeMY);
    bounds.extend(homeUK);
    map.fitBounds(bounds);
  };

  const boundByAustralia = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach((location) => bounds.extend(location));
    map.fitBounds(bounds);
  };

  //TODO:
  /*const clusterMarkerRenderer = {(cluster) => {
    return new window.google.maps.Marker({
      position: cluster.position,
      label: String(cluster.markers.length),
      icon: {
        path: faLocationPin.icon[4],
        fillColor: "#0000ff",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.075,
      },
    });
  }}*/
  /*const clusterMarkerRenderer = {
    render: (param) => {
      console.log("param", param);
      return new window.google.maps.Marker({
        label: { text: String(param.count), color: "white", fontSize: "10px" },
        position: param.position,
        // adjust zIndex to be above other markers
        zIndex: Number(window.google.maps.Marker.MAX_ZINDEX) + param.count,
      });
    },
  };*/

  const setGoogleMapMarkers = (map) => {
    var positions = locations.map((position) => {
      var newPosition = new window.google.maps.LatLng(
        position.lat,
        position.lng
      );
      newPosition.count = 1;
      return newPosition;
    });
    var markerIcon = {
      path: "M13.5796046,38.8603699 L14.5,40 L14.5,40 L15.4203954,38.8603699 L15.4203954,38.8603699 L16.3106139,37.7414157 C16.456469,37.5566463 16.6010666,37.3727384 16.7444069,37.1896919 L17.58936,36.1017514 L17.58936,36.1017514 L18.4041363,35.0344866 L18.4041363,35.0344866 L19.1887357,33.9878976 L19.1887357,33.9878976 L19.9431582,32.9619844 C20.0663805,32.7927219 20.1883455,32.6243208 20.3090531,32.4567813 L21.0182102,31.4618818 L21.0182102,31.4618818 L21.6971904,30.4876581 L21.6971904,30.4876581 L22.3459938,29.5341102 C23.1909469,28.2764969 23.9554284,27.0740191 24.6394381,25.9266767 L25.1373569,25.0765078 C27.7124523,20.5974092 29,17.000478 29,14.2857143 C29,6.39593215 22.5081289,0 14.5,0 C6.49187113,0 0,6.39593215 0,14.2857143 C0,16.5762962 0.916623309,19.4949055 2.74986993,23.0415422 L3.17234651,23.8400216 C3.39112903,24.2444302 3.62122789,24.6565923 3.86264308,25.0765078 L4.36056191,25.9266767 C5.04457163,27.0740191 5.80905307,28.2764969 6.65400624,29.5341102 L7.30280957,30.4876581 L7.30280957,30.4876581 L7.9817898,31.4618818 L7.9817898,31.4618818 L8.69094693,32.4567813 C8.81165453,32.6243208 8.93361949,32.7927219 9.05684183,32.9619844 L9.81126431,33.9878976 L9.81126431,33.9878976 L10.5958637,35.0344866 L10.5958637,35.0344866 L11.41064,36.1017514 L11.41064,36.1017514 L12.2555931,37.1896919 L12.2555931,37.1896919 L13.1307232,38.2983083 C13.279093,38.4848007 13.4287201,38.6721546 13.5796046,38.8603699 L13.5796046,38.8603699 Z",
      fillColor: "#0591E5",
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 0.9,
      labelOrigin: new window.google.maps.Point(15, 16),
    };

    var clusterIcon = {
      path: "M13.5796046,38.8603699 L14.5,40 L14.5,40 L15.4203954,38.8603699 L15.4203954,38.8603699 L16.3106139,37.7414157 C16.456469,37.5566463 16.6010666,37.3727384 16.7444069,37.1896919 L17.58936,36.1017514 L17.58936,36.1017514 L18.4041363,35.0344866 L18.4041363,35.0344866 L19.1887357,33.9878976 L19.1887357,33.9878976 L19.9431582,32.9619844 C20.0663805,32.7927219 20.1883455,32.6243208 20.3090531,32.4567813 L21.0182102,31.4618818 L21.0182102,31.4618818 L21.6971904,30.4876581 L21.6971904,30.4876581 L22.3459938,29.5341102 C23.1909469,28.2764969 23.9554284,27.0740191 24.6394381,25.9266767 L25.1373569,25.0765078 C27.7124523,20.5974092 29,17.000478 29,14.2857143 C29,6.39593215 22.5081289,0 14.5,0 C6.49187113,0 0,6.39593215 0,14.2857143 C0,16.5762962 0.916623309,19.4949055 2.74986993,23.0415422 L3.17234651,23.8400216 C3.39112903,24.2444302 3.62122789,24.6565923 3.86264308,25.0765078 L4.36056191,25.9266767 C5.04457163,27.0740191 5.80905307,28.2764969 6.65400624,29.5341102 L7.30280957,30.4876581 L7.30280957,30.4876581 L7.9817898,31.4618818 L7.9817898,31.4618818 L8.69094693,32.4567813 C8.81165453,32.6243208 8.93361949,32.7927219 9.05684183,32.9619844 L9.81126431,33.9878976 L9.81126431,33.9878976 L10.5958637,35.0344866 L10.5958637,35.0344866 L11.41064,36.1017514 L11.41064,36.1017514 L12.2555931,37.1896919 L12.2555931,37.1896919 L13.1307232,38.2983083 C13.279093,38.4848007 13.4287201,38.6721546 13.5796046,38.8603699 L13.5796046,38.8603699 Z",
      fillColor: "#FFB71C",
      fillOpacity: 1,
      strokeWeight: 0,
      scale: 0.9,
      labelOrigin: new window.google.maps.Point(15, 16),
    };

    //build map pins
    const markers =
      positions &&
      positions.map((position) => {
        let marker = new window.google.maps.Marker({
          position: position,
          icon: markerIcon,
          label: {
            text: String(position.count),
            color: "#fff",
            fontSize: "16px",
          },
        });
        marker.count = position.count;
        marker.addListener("click", (e) => {
          displayMarkerInfo(position);
        });
        return marker;
      });

    //build map pin clusters
    const rendererCluster = {
      render: ({ position, markers }) =>
        new window.google.maps.Marker({
          label: {
            text: String(
              markers.reduce((total, marker) => total + marker.count, 0)
            ),
            color: "#000",
            fontSize: "16px",
          },
          position: position,
          icon: clusterIcon,
        }),
    };

    new MarkerClusterer({ markers, map, renderer: rendererCluster });
  };

  const displayMarkerInfo = (position) => {
    setZoomIndividualPin(position);
  }
  const setZoomIndividualPin = (position) => {
    setCenter({lat: Number(position.lat()) + ((tmp % 2) * 0.00001), lng: Number(position.lng()) + ((tmp % 2) * 0.00001)});
    setZoomLevel(14 + (tmp % 2 * 0.001));

    setTmp(tmp + 1);
  }

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <React.Fragment>
      <p>Map Loaded ! </p>
      <button onClick={() => boundByHome(map)}>Home Area</button>
      <button onClick={() => boundByAustralia(map)}>Australia Area</button>
      <GoogleMap
        zoom={zoomLevel}
        center={center}
        mapContainerClassName="map-container"
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={homeHK}
          icon={{
            path: faLocationPin.icon[4],
            fillColor: "#0000ff",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.075,
          }}
          label="HK"
          onClick={() => {
            displayMarkerInfo(new window.google.maps.LatLng(
              homeHK.lat,
              homeHK.lng
            ));
            setTimeout(() => alert("This is my home in Hong Kong !"), 500);
          }}
        />
        <Marker
          position={homeMY}
          icon={{
            path: faLocationPin.icon[4],
            fillColor: "#0000ff",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.075,
          }}
          label="MY"
          onClick={() => {
            displayMarkerInfo(new window.google.maps.LatLng(
              homeMY.lat,
              homeMY.lng
            ));
            setTimeout(() => alert("This is my home in Malaysia !"), 500);
          }}
        />
        <Marker
          position={homeUK}
          icon={{
            path: faLocationPin.icon[4],
            fillColor: "#0000ff",
            fillOpacity: 1,
            strokeWeight: 1,
            strokeColor: "#ffffff",
            scale: 0.075,
          }}
          label="UK"
          onClick={() => {
            displayMarkerInfo(new window.google.maps.LatLng(
              homeUK.lat,
              homeUK.lng
            ));
            setTimeout(() => alert("This is my home in United Kingdom !"), 500);
          }}
        />
        {/*<MarkerClusterer renderer={rendererCluster}>
          {(clusterer) =>
            locations.map((location, index) => (
              <Marker
                key={index}
                position={location}
                clusterer={clusterer}
                label={"Aus" + index}
                icon={{
                  path: faLocationPin.icon[4],
                  fillColor: "#0000ff",
                  fillOpacity: 1,
                  strokeWeight: 1,
                  strokeColor: "#ffffff",
                  scale: 0.075,
                }}
              />
            ))
          }
        </MarkerClusterer>*/}
      </GoogleMap>
    </React.Fragment>
  );
};

export default Map;
