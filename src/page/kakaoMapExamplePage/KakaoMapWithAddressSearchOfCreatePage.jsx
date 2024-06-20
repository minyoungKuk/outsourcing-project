import KakaoMapWithAddressSearch from '../../components/kakao/KakaoMapWithAddressSearch.jsx';
import useKakaoMapStore from '../../zustand/kakaoMapStore.js';
import supabase from '../../config/supabase.js';
import { useQuery } from '@tanstack/react-query';
import { getPostList } from '../../api/listApi.js';

function KakaoMapWithAddressSearchOfCreatePage() {
  //유저가 주소를 검색완료 했다면 map이 기본값외에 주소들을 가지고 있다.
  const { map } = useKakaoMapStore((state) => state);

  // 포스트 작성버튼을 누르면 실행되는 함수
  const create = async () => {
    supabase
      .from('POST')
      .insert([
        {
          user_id: '89895a0e-d365-4995-aa96-d1b2d68d9aa9', //임의의 값
          content: '게시물 내용입니다', //임의의 값
          place_name: map.placeName,
          address: map.address,
          region: map.region,
          latitude: map.latitude,
          longitude: map.longitude,
        },
      ])
      .select()
      .then((response) => {
        if (!response.error) {
          alert('저장되었습니다.');
        }
      });
  };

  return (
    // 부모 태그의 넓이 만큼 KakaoMapWithAddressSearch의 넓이가 설정됨
    <div className={'max-w-1080'}>
      {/*카카오맵과 주소검색이 같이 있는 컴포넌트 포스트 작성 수정시 사용하면 됨*/}
      <KakaoMapWithAddressSearch />

      {/*등록버튼*/}
      <button onClick={create} className="w-6">
        등록
      </button>
    </div>
  );
}

export default KakaoMapWithAddressSearchOfCreatePage;
