function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름 (단위: km)
  const dLat = deg2rad(lat2 - lat1); // 위도 차이를 라디안으로 변환
  const dLon = deg2rad(lon2 - lon1); // 경도 차이를 라디안으로 변환
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // 거리 (단위: km)
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * 두개의 장소의 거리가 100m 미만인지 체크,
 * */
export function isWithin100Meters(lat1, lon1, lat2, lon2) {
  const distanceInKm = getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
  return distanceInKm * 1000 < 100; // km를 m로 변환
}

