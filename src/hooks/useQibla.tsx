
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  calculateQiblaDirection, 
  calculateDistanceToKaaba 
} from "../utils/qiblaCalculations";

interface QiblaData {
  qiblaDirection: number | null;
  distance: number | null;
  latitude: number | null;
  longitude: number | null;
  deviceOrientation: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useQibla = () => {
  const [qiblaData, setQiblaData] = useState<QiblaData>({
    qiblaDirection: null,
    distance: null,
    latitude: null,
    longitude: null,
    deviceOrientation: null,
    isLoading: true,
    error: null,
  });

  // Handle device orientation changes
  useEffect(() => {
    let orientationListener: (event: DeviceOrientationEvent) => void;

    const setupOrientationListener = () => {
      orientationListener = (event: DeviceOrientationEvent) => {
        // Alpha is the compass direction the device is facing in degrees
        if (event.alpha !== null) {
          setQiblaData((prev) => ({
            ...prev,
            deviceOrientation: 360 - event.alpha,
          }));
        }
      };

      if (typeof DeviceOrientationEvent !== "undefined") {
        // Standard way for modern browsers
        window.addEventListener("deviceorientation", orientationListener);
      } else {
        toast.error("Your device doesn't support orientation detection");
        setQiblaData((prev) => ({
          ...prev,
          error: "Device orientation not supported",
        }));
      }
    };

    // Request device orientation permission on iOS 13+
    const requestOrientationPermission = async () => {
      try {
        // @ts-ignore: requestPermission exists on iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
          // @ts-ignore
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            setupOrientationListener();
          } else {
            toast.error("Permission to access device orientation was denied");
            setQiblaData((prev) => ({
              ...prev,
              error: "Orientation permission denied",
            }));
          }
        } else {
          // Non-iOS devices or older iOS versions
          setupOrientationListener();
        }
      } catch (error) {
        console.error("Error requesting orientation permission:", error);
        toast.error("Unable to access device orientation");
        setQiblaData((prev) => ({
          ...prev,
          error: "Orientation access error",
        }));
      }
    };

    // Get the user's current location
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const qiblaDirection = calculateQiblaDirection(latitude, longitude);
            const distance = calculateDistanceToKaaba(latitude, longitude);

            setQiblaData((prev) => ({
              ...prev,
              qiblaDirection,
              distance,
              latitude,
              longitude,
              isLoading: false,
              error: null,
            }));

            // After getting location, request orientation permission
            requestOrientationPermission();
          },
          (error) => {
            console.error("Error getting location:", error);
            let errorMessage;
            
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Location permission denied";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information unavailable";
                break;
              case error.TIMEOUT:
                errorMessage = "Location request timed out";
                break;
              default:
                errorMessage = "Unknown location error";
            }
            
            toast.error(errorMessage);
            setQiblaData((prev) => ({
              ...prev,
              isLoading: false,
              error: errorMessage,
            }));
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser");
        setQiblaData((prev) => ({
          ...prev,
          isLoading: false,
          error: "Geolocation not supported",
        }));
      }
    };

    getLocation();

    // Cleanup function
    return () => {
      if (orientationListener) {
        window.removeEventListener("deviceorientation", orientationListener);
      }
    };
  }, []);

  // Function to refresh location and recalculate
  const refreshLocation = () => {
    setQiblaData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const qiblaDirection = calculateQiblaDirection(latitude, longitude);
        const distance = calculateDistanceToKaaba(latitude, longitude);

        setQiblaData((prev) => ({
          ...prev,
          qiblaDirection,
          distance,
          latitude,
          longitude,
          isLoading: false,
          error: null,
        }));

        toast.success("Location updated successfully");
      },
      (error) => {
        console.error("Error refreshing location:", error);
        toast.error("Failed to update location");
        setQiblaData((prev) => ({
          ...prev,
          isLoading: false,
          error: "Location refresh failed",
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return {
    ...qiblaData,
    refreshLocation,
  };
};
