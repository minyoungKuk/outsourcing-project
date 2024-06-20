import { useEffect, useState } from 'react';
import supabase from '../config/supabase';

const useFetchHomePagePost = () => {
  const [postList, setPostList] = useState([]);
  const [popularPostList, setPopularPostList] = useState([]);

  useEffect(() => {
    supabase
      .from('POST')
      .select('*')
      .then((response) => {
        if (!response.error) {
          const posts = response.data.map((data) => ({
            id: data.id,
            latitude: data.latitude,
            longitude: data.longitude,
            placeName: data.place_name,
            address: data.address,
            likeCnt: data.like_cnt,
            imgUrl: data.img_url,
            content: data.content,
          }));

          setPostList(posts);

          const sortedPost = [...posts]
            .sort((a, b) => b.likeCnt - a.likeCnt)
            .slice(0, 9);
          setPopularPostList(sortedPost);
        }
      });
  }, []);

  return { postList, popularPostList };
};

export default useFetchHomePagePost;
