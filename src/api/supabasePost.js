import supabase from '../config/supabase';
// create
export const createDetail = async (post) => {
  const data = await supabase.from('POST').insert(post).select('*');
  // if (error) {
  //   throw new Error(error.message);
  // }
  console.log(data.data[0]);
  return data.data[0];
};
export const createPostCategory = async (category) => {
  const { data, error } = await supabase
    .from('POST_CATEGORY')
    .insert(category)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  console.log('카태고리 data', data); // 디버깅 로그 추가
  return data;
};
// read - 1개 포스트
export const getDetails = async ({ queryKey }) => {
  const { data } = await supabase
    .from('POST')
    .select('*')
    .eq('id', queryKey[1]);
  return data[0];
};
// read - 전체 포스트
export const getAllPosts = async () => {
  let { data: allData } = await supabase.from('POST').select('*');
  console.log('alldata ->', allData);

  return allData;
};
// update
export const updateDetail = async (changedPost) => {
  const { data, error } = await supabase
    .from('POST')
    .update(changedPost)
    .eq('id', changedPost.id)
    .select();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
// delete
export const deleteDetail = async (deletePostId) => {
  const { data, error } = await supabase
    .from('POST')
    .delete()
    .eq('id', deletePostId);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};
// (내가쓴 글 불러오기)
export const getMyPostList = async ({ queryKey }) => {
  const userId = queryKey[1];
  const { data } = await supabase
    .from('POST')
    .select('*')
    .eq('user_id', userId);

  console.log(userId);

  //여기다가 로직 작성하기
  return data.map((post) => {
    return {
      id: post.id,
      imgUrl: post.img_url,
      content: post.content,
      address: post.address,
      placeName: post.place_name,
    };
  });
};

// 좋아요 글 불러오기
export const getLikePostList = async ({ queryKey }) => {
  console.log(queryKey[1]);

  let { data: POST_LIKE, error } = await supabase
    .from('POST_LIKE')
    .select('*')
    .eq('user_id', queryKey[1]);
  const postIdList = POST_LIKE.map((post) => {
    return post.post_id;
  });
  const postList = await getPostByIdIn(postIdList);
  console.log(postList);
  return postList.map((post) => {
    return {
      id: post.id,
      imgUrl: post.img_url,
      content: post.content,
      address: post.address,
      placeName: post.place_name,
    };
  });
};

export const getPostByIdIn = async (postIdList) => {
  let { data: POST, error } = await supabase
    .from('POST')
    .select('*')
    .in('id', postIdList);

  return POST;
};
