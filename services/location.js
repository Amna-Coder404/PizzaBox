import * as Location from "expo-location";

// REQUEST LOCATION PERMISSION

export const requestLocationPermission = async () => {
    const { status } =
        await Location.requestForegroundPermissionsAsync();

    return status === Location.PermissionStatus.GRANTED;
};


// GET CURRENT GPS LOCATION

export const getCurrentLocation = async () => {
    const location =
        await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
};


// CONVERT GPS COORDINATES TO ADDRESS

export const getAddressFromCoordinates = async (latitude, longitude) => {
    const results =
        await Location.reverseGeocodeAsync({ latitude, longitude, });

    if (!results || results.length === 0) {
        return "";
    }

    const address = results[0];

    const parts = [
        // address.name,
        // address.district,
        // address.region,
        // address.country,

        address.city,
        address.street || address.name,
    ].filter(Boolean);

    return parts.join(", ");
};


// GET COMPLETE USER LOCATION

export const getUserLocation = async () => {

    // 1. Ask permission
    const permissionGranted = await requestLocationPermission();

    if (!permissionGranted) {
        throw new Error(
            "Location permission was not granted."
        );
    }

    // 2. Get GPS coordinates
    const coordinates = await getCurrentLocation();

    // 3. Convert coordinates to readable address
    const address =
        await getAddressFromCoordinates(coordinates.latitude, coordinates.longitude);

    // 4. Return everything
    return {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        address,
    };
};