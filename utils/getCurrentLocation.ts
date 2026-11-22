import * as Location from 'expo-location';

// Reads the phone's current position for attendance check-in.
// Never logs coordinates.

export type LocationCoords = {
  latitude:  number;
  longitude: number;
  accuracy:  number;   // metres, always > 0
};

export type LocationFailureReason =
  | 'services_off'   // GPS / location services switched off
  | 'denied'         // permission refused, can ask again
  | 'blocked'        // permission refused, must be changed in Settings
  | 'unavailable';   // no fix, or no usable accuracy

export type LocationResult =
  | { ok: true;  coords: LocationCoords }
  | { ok: false; reason: LocationFailureReason };

export async function getCurrentLocation(): Promise<LocationResult> {
  try {
    const servicesOn = await Location.hasServicesEnabledAsync();
    if (!servicesOn) return { ok: false, reason: 'services_off' };

    const perm = await Location.requestForegroundPermissionsAsync();
    if (perm.status !== Location.PermissionStatus.GRANTED) {
      return { ok: false, reason: perm.canAskAgain === false ? 'blocked' : 'denied' };
    }

    const position = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const { latitude, longitude, accuracy } = position.coords;

    // The backend requires accuracy > 0.
    if (
      typeof accuracy !== 'number' || !Number.isFinite(accuracy) || accuracy <= 0 ||
      !Number.isFinite(latitude) || !Number.isFinite(longitude)
    ) {
      return { ok: false, reason: 'unavailable' };
    }

    return { ok: true, coords: { latitude, longitude, accuracy } };
  } catch {
    return { ok: false, reason: 'unavailable' };
  }
}
