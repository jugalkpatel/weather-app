import AsyncSelect from "react-select/async";
import {
  LocationOption,
  LocationsResponse,
} from "../../slices/weather/weather.types";
import axios from "axios";
import { useAppDispatch } from "../../store";
import { SingleValue } from "react-select";
import { setLocation } from "../../slices/weather/weather.slice";
const promiseOptions = (inputValue: string) => {
  return new Promise<LocationOption[]>((resolve, reject) => {
    axios
      .get<LocationsResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${
          inputValue || "Aa"
        }&count=10&language=en&format=json`
      )
      .then((res) => {
        const { data } = res;

        const locations: LocationOption[] = data.results.map(
          ({ id, latitude, longitude, name }) => {
            return {
              id,
              latitude,
              longitude,
              name,
            };
          }
        );

        console.log({ locations });

        resolve(locations);
      })
      .catch(() => {
        reject([]);
      });
  });
};

export function SelectLocation() {
  const dispatch = useAppDispatch();

  const handleLocationChange = (option: SingleValue<LocationOption>) => {
    if (option?.latitude && option?.longitude) {
      const { latitude, longitude } = option;
      dispatch(setLocation({ longitude, latitude }));
    }
  };

  return (
    <AsyncSelect<LocationOption>
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions}
      getOptionLabel={({ name }) => name}
      getOptionValue={({ id }) => String(id)}
      onChange={handleLocationChange}
      classNamePrefix="react-select"
      noOptionsMessage={() => "No locations found. At least type two letters"}
    />
  );
}
