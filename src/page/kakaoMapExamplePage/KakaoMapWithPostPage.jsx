import KakaoMapWithPost from '../../components/kakao/KakaoMapWithPost.jsx';
import { useEffect, useState } from 'react';
import supabase from '../../config/supabase.js';

function KakaoMapWithPostPage() {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    supabase
    .from('POST')
    .select('*')
    .then(response => {
      if (!response.error) {
        setPostList(response.data.map(data => {
          return {
            id: data.id,
            latitude : data.latitude,
            longitude : data.longitude,
            placeName : data.place_name,
            address : data.address,
          }
        }));
      }
    });
  }, []);

  return (
    <KakaoMapWithPost postList={postList}></KakaoMapWithPost>
  );
}

export default KakaoMapWithPostPage;