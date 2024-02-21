import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
function useLocation() {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((permission) => {
      //console.log(permission);
      //izin vermediyse return
      if (permission.status !== "granted") {
        return;
      }
      //izin verdiyse konum bilgisini al
      Location.getCurrentPositionAsync().then((location) => {
        setLocation(location);
      });
      Location.watchPositionAsync(
        //konum değiştiğinde güncelle
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          setLocation(location);
        }
      );
    });
  }, []);

  return location;
}
export default useLocation;
