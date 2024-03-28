import { useState, useEffect, useRef } from "react";
interface PositionOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}
export type GeolocationState = {
  loading: boolean;
  latitude: number | null;
  longitude: number | null;
  error: GeolocationPositionError | null;
};

export function useGeolocation(options: PositionOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    loading: true,
    latitude: null,
    longitude: null,
    error: null,
  });

  const optionsRef = useRef(options);

  useEffect(() => {
    const onEvent: PositionCallback = ({ coords }) => {
      setState({
        loading: false,
        latitude: coords.latitude,
        longitude: coords.longitude,
        error: null,
      });
    };

    const onEventError: PositionErrorCallback = (error) => {
      setState((s) => ({
        ...s,
        loading: false,
        error,
      }));
    };

    navigator.geolocation.getCurrentPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    const watchId = navigator.geolocation.watchPosition(
      onEvent,
      onEventError,
      optionsRef.current
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return state;
}
