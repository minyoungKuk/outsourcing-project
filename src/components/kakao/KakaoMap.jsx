import { useEffect } from 'react';

function KakaoMap({latitude, longitude}) {

  useEffect(() => {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
        level: 4, // 지도의 확대 레벨
      };

    var map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 마커가 표시될 위치입니다
    var markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
  }, [latitude, longitude]);

  return (
    <>
      <div id="map" className="w-full h-96"></div>
    </>
  );
}

export default KakaoMap;