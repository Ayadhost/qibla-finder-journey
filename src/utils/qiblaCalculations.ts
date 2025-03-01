
// Constants for Kaaba location
const KAABA_LATITUDE = 21.4225;
const KAABA_LONGITUDE = 39.8262;

// Convert degrees to radians
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Convert radians to degrees
const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};

// Calculate Qibla direction from current location
export const calculateQiblaDirection = (
  latitude: number,
  longitude: number
): number => {
  // Convert all coordinates to radians
  const lat1 = toRadians(latitude);
  const lon1 = toRadians(longitude);
  const lat2 = toRadians(KAABA_LATITUDE);
  const lon2 = toRadians(KAABA_LONGITUDE);

  // Calculate Qibla direction using the spherical law of cosines
  const y = Math.sin(lon2 - lon1);
  const x =
    Math.cos(lat1) * Math.tan(lat2) -
    Math.sin(lat1) * Math.cos(lon2 - lon1);

  let qiblaDirection = Math.atan2(y, x);
  qiblaDirection = toDegrees(qiblaDirection);

  // Normalize to 0-360 degrees
  qiblaDirection = (qiblaDirection + 360) % 360;

  return qiblaDirection;
};

// Calculate distance to Kaaba in kilometers
export const calculateDistanceToKaaba = (
  latitude: number,
  longitude: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const lat1 = toRadians(latitude);
  const lon1 = toRadians(longitude);
  const lat2 = toRadians(KAABA_LATITUDE);
  const lon2 = toRadians(KAABA_LONGITUDE);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance);
};

// Format coordinates to a readable string
export const formatCoordinate = (
  coordinate: number,
  type: "latitude" | "longitude"
): string => {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const minutes = Math.floor((absolute - degrees) * 60);
  const seconds = Math.round(((absolute - degrees) * 60 - minutes) * 60);

  let direction = "";
  if (type === "latitude") {
    direction = coordinate >= 0 ? "N" : "S";
  } else {
    direction = coordinate >= 0 ? "E" : "W";
  }

  return `${degrees}° ${minutes}' ${seconds}" ${direction}`;
};
