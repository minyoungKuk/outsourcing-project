import supabase from '../config/supabase.js';

export const getPostList = async ({ pageParam = 0, queryKey }) => {
  const [_key, { keyword, categoryList, limit }] = queryKey;

  let query = supabase
  .rpc('get_distinct_posts', {
    keyword: keyword,
    category_list: categoryList,
    request_limit: limit,
    requestoffset: pageParam * limit,
  });

  // 쿼리 실행 및 데이터 처리
  const { data, error } = await query;

  if (error) {
    console.error("Error executing query:", error.message);
    throw new Error(error.message);
  }

  return {
    data: data.map(post => ({
      id: post.id,
      latitude: post.latitude,
      longitude: post.longitude,
      placeName: post.place_name,
      address: post.address,
      imgUrl: post.img_url,
      content: post.content,
    })),
    nextPage: data.length === limit ? pageParam + 1 : undefined,
  };
};