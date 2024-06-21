import { useEffect, useRef, useState } from 'react';
import useKakaoMapStore from '../../zustand/kakaoMapStore.js';

function KakaoMapWithAddressSearch() {
  const [longitude, setLongitude] = useState(0); // x
  const [latitude, setLatitude] = useState(0); // y
  const [search, setSearch] = useState('');


  const { setMap, map } = useKakaoMapStore((state) => state);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    setLongitude(map.longitude || 127.09598);
    setLatitude(map.latitude || 37.54699);
    setSearch(map.address);
  }, [map]);

  useEffect(() => {
    const container = document.getElementById('map');

    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 4,
    };

    const map = new window.kakao.maps.Map(container, options); // 지도를 생성합니다

    const imageSrc = import.meta.env.VITE_KAKAO_MARKER_IMAGE_URL, // 마커이미지의 주소입니다
      imageSize = new window.kakao.maps.Size(24, 35), // 마커이미지의 크기입니다
      imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
    const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption,
      ),
      markerPosition = new window.kakao.maps.LatLng(latitude, longitude); // 마커가 표시될 위치입니다

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage, // 마커이미지 설정
    });
    marker.setMap(map);
  }, [longitude, latitude]);

  const open = (e) => {
    e.preventDefault();

    new daum.Postcode({
      oncomplete: function (data) {
        //주소-좌표 변환 객체를 생성
        const geocoder = new daum.maps.services.Geocoder();

        // 주소로 상세 정보를 검색
        geocoder.addressSearch(data.address, function (results, status) {
          // 정상적으로 검색이 완료됐으면
          if (status === daum.maps.services.Status.OK) {
            var result = results[0]; //첫번째 결과의 값을 활용

            const {
              building_name: placeName,
              address_name: address,
              region_1depth_name: region,
            } = result.road_address;
            setLatitude(result.x);
            setLongitude(result.y);

            setMap({
              placeName,
              address,
              region,
              longitude: result.x,
              latitude: result.y,
            });
          }
        });
      },
    }).open({
      q: search,
    });
  };

  return (
    <div className={'flex flex-col gap-6 mt-4'}>
      <form onSubmit={open} className={'flex justify-center'}>
        <input
          className={'w-600 h-10 bg-white rounded-3xl pl-4 drop-shadow'}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={'주소를 검색해주세요.'}
          ref={inputRef}
        />
        <button type={'submit'} hidden>
          {' '}
          검색
        </button>
      </form>
      <div id="map" className="w-full h-96"></div>
    </div>
  );
}

export default KakaoMapWithAddressSearch;
