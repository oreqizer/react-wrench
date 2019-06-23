type Geo = {
  lon: number;
  lat: number;
};

// eslint-disable-next-line import/prefer-default-export
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
