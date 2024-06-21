import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoMapWithPost({ postList = [] }) {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('사용자가 위치 정보 제공을 거부했습니다.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('위치 정보를 사용할 수 없습니다.');
              break;
            case error.TIMEOUT:
              alert('위치 정보를 가져오는 데 시간이 초과되었습니다.');
              break;
            case error.UNKNOWN_ERROR:
              alert('알 수 없는 오류가 발생했습니다.');
              break;
            default:
              alert('알 수 없는 오류가 발생했습니다.');
          }
        },
      );
    } else {
      alert('이 브라우저는 Geolocation을 지원하지 않습니다.');
    }
  }, []);

  // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
  const makeOverListener = (map, marker, infowindow) => {
    return function() {
      infowindow.open(map, marker);
    };
  };

  // 인포윈도우를 닫는 클로저를 만드는 함수입니다
  const makeOutListener = (infowindow) => {
    return function() {
      infowindow.close();
    };
  };

  const moveDetail = (detailId) => {
    if (detailId) {
      navigate(`/detail/${detailId}`);
    }
  };

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(location.latitude, location.longitude),
      level: 4,
    };
    const map = new window.kakao.maps.Map(container, options); // 지도를 생성합니다

    const positions = postList.map(post => {
      return {
        title: `<a style="
                  text-overflow: ellipsis; 
                  width: 160px;
                  display: block;
                  text-align: center;
                  overflow: hidden;
                  white-space: nowrap;
                ">${post.placeName || post.address}<a>`,
        id: post.id,
        latlng: new window.kakao.maps.LatLng(post.latitude, post.longitude),
      };
    });

    positions.push({
      title: `<a style="padding-left: 50px">현위치<a>`,
      latlng: new window.kakao.maps.LatLng(location.latitude, location.longitude),
    });

    for (let i = 0; i < positions?.length; i++) {
      (function(i) {

        let imageSrc = ' https://ookczceidorqoevzkbmi.supabase.co/storage/v1/object/public/avatars/Group_96.png';// 마커이미지의 주소입니다
        const imageSize = new window.kakao.maps.Size(24, 35);

        if (!positions[i].id) {
          imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
        }

        // 마커 이미지를 생성합니다
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          image: markerImage, // 마커 이미지
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: positions[i].title, // 인포윈도우에 표시할 내용
        });

        // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
        // 이벤트 리스너로는 클로저를 만들어 등록합니다
        // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
        window.kakao.maps.event.addListener(marker, 'mouseover',
          makeOverListener(map, marker, infowindow));

        window.kakao.maps.event.addListener(marker, 'mouseout',
          makeOutListener(infowindow));

        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, 'click', function() {
          moveDetail(positions[i].id);
        });
      })(i);
    }
  }, [location, postList]);

  return <div id="map" className="w-full h-96"></div>;
}

export default KakaoMapWithPost;