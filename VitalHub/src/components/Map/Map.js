import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { Container } from "../Container/Style";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import { LocationAccuracy, getCurrentPositionAsync, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import { mapskey } from "../../utils/mapsApiKey";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Title } from "../Title/Style";
import api from "../../Service/Service";

export const Map = (latitude, longitude) => {

    console.log(latitude, longitude);
    
    const mapReference = useRef(null) // Referência para o mapa
    const [initialPosition, setInitialPosition] = useState(null)
    const [finalPosition, setFinalPosition] = useState({})

    async function CaptureLocation() {
        const {granted} = await requestForegroundPermissionsAsync()

        if (granted) {
            const captureLocation = await getCurrentPositionAsync()

            setInitialPosition(captureLocation);
        }
    }


    async function ReloadMapView() {
        if (mapReference.current && initialPosition) {
            await mapReference.current.fitToCoordinates(
                [
                    {latitude: initialPosition.coords.latitude, longitude: initialPosition.coords.longitude},
                    {latitude: finalPosition.latitude, longitude: finalPosition.longitude}
                ],
                {
                    edgePadding: {top: 60, right: 60, bottom: 60, left: 60 },
                    animated: true
                }
            )
        }
        
    }



    useEffect(() => {
        CaptureLocation()

        setFinalPosition(latitude, longitude)
        // watchPositionAsync({
        //     accuracy: LocationAccuracy.Highest,
        //     timeInterval: 1000,
        //     distanceInterval: 1,
        // }, async (response) =>{
        //     await setInitialPosition(response)

        //     mapReference.current?.animateCamera({
        //         pitch: 60,
        //         center: response.coords
        //     })
        // })

    }, [1000])

    useEffect(() => {
        ReloadMapView()
    }, [initialPosition])

    return(
        <>
        {
            initialPosition != null
            ? (<MapView

                ref={mapReference}

                initialRegion={{
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                    latitude: -23.615057,
                    longitude: -46.570819
                }}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
            >

                <Marker
                    coordinate={{
                        latitude: initialPosition.coords.latitude,
                        longitude: initialPosition.coords.longitude,
                    }}
                    title="Initial Position"
                    description="Description"
                >
                        <MaterialCommunityIcons name="map-marker-account" size={40}/>
                </Marker>

                <MapViewDirections
                    origin={initialPosition.coords}
                    destination={finalPosition}
                    strokeWidth={5}
                    strokeColor="#496BBA"
                    apikey={mapskey}
                />

                <Marker
                    coordinate={finalPosition}
                    title="Destiny"
                    description="place to go"
                    pinColor={'red'}
                >
                    <MaterialCommunityIcons name="map-marker" size={40} color={"red"}/>
                </Marker>

            </MapView>
            ) : (
                <>
                    <Text>Endereço não encontrado! </Text>
                    <ActivityIndicator size={50} />
                </>
            )
        }
        </>
    )
}

const styles = StyleSheet.create({
    map : {
      flex : 1,
      width : '100%'
    }
  });