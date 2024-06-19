import KakaoMap from '../../components/kakao/KakaoMap.jsx';
import { useEffect, useState } from 'react';
import supabase from '../../config/supabase.js';

function KakaoMapPage() {

  const [post, setPost] = useState({});

  useEffect(() => {
    supabase
    .from('POST')
    .select('*')
    .eq('id', '654475a3-96b1-4b40-b8ec-dfa9896a45b1')
    .then(response => {
      if (!response.error) {
        const data = response.data[0];
        setPost({
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
    <KakaoMap latitude={post.latitude} longitude={post.longitude}></KakaoMap>
  );
}

export default KakaoMapPage;