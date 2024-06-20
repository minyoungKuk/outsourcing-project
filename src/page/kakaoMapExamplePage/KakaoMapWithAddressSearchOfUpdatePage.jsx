import KakaoMapWithAddressSearch
  from '../../components/kakao/KakaoMapWithAddressSearch.jsx';
import useKakaoMapStore from '../../zustand/kakaoMapStore.js';
import supabase from '../../config/supabase.js';
import { useEffect } from 'react';

function KakaoMapWithAddressSearchOfUpdatePage() {
  //유저가 주소를 검색완료 했다면 map이 기본값외에 주소들을 가지고 있다.
  const { map, setMap } = useKakaoMapStore((state) => state);

  useEffect(() => {
    supabase
      .from('POST')
      .select('*')
      .eq('id', '654475a3-96b1-4b40-b8ec-dfa9896a45b1')
      .then((response) => {
        if (!response.error) {
          const data = response.data[0];
          setMap({
            id: data.id,
            latitude: data.latitude,
            longitude: data.longitude,
            placeName: data.place_name,
            address: data.address,
          });
        }
      });
  }, []);

  return (
    // 부모 태그의 넓이 만큼 KakaoMapWithAddressSearch의 넓이가 설정됨
    <div className={'w-600'}>
      {/*카카오맵과 주소검색이 같이 있는컴포넌트 포스트 작성 수정시 사용하면됨*/}
      <KakaoMapWithAddressSearch />
    </div>
  );
}

export default KakaoMapWithAddressSearchOfUpdatePage;
