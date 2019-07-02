import * as React from "react";

type Geo = {
  lon: number;
  lat: number;
};

export const getCurrent = (): Promise<Geo | null> =>
  new Promise(resolve => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            lon: coords.longitude,
            lat: coords.latitude,
          });
        },
        () => {
          resolve(null);
        },
      );
    } else {
      resolve(null);
    }
  });

export const useGeo = (): Geo | null => {
  const [geo, setGeo] = React.useState<Geo | null>(null);

  React.useEffect(() => {
    getCurrent()
      .then(res => {
        setGeo(res);
      })
      .catch(() => {});
  });

  return geo;
};
