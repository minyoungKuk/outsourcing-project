import { data } from 'autoprefixer';
import supabase from '../config/supabase';

// create
export const createDetail = async (post) => {
  const data = await supabase.from('POST').insert(post).select('*');
  // if (error) {
  //   throw new Error(error.message);
  // }
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
  return data;
};

// read - 전체 포스트
export const getAllPosts = async ({ queryKey }) => {
  if (queryKey[1]) {
    const { data: allData, error } = await supabase
      .from('POST')
      .select('*')
      .eq('address', queryKey[1]?.address)
      .neq('id', queryKey[1]?.id);
    if (error) {
      throw new Error(error.message);
    }
    return allData.map((data) => {
      return {
        address: data.address,
        content: data.content,
        create_at: data.create_at,
        id: data.id,
        imgUrl: data.img_url,
        latitude: data.latitude,
        like_cnt: data.like_cnt,
        longtitude: data.longtitude,
        placeName: data.place_name,
        region: data.region,
        user_id: data.user_id,
      };
    });
  }

  return [];
};

//특정 id를 가진 글의 정보
export const getDetails = async ({ queryKey }) => {
  const { data, error } = await supabase
    .from('POST')
    .select('*')
    .eq('id', queryKey[1]);
  if (error) {
    throw new Error(error.message);
  }

  return {
    address: data[0].address,
    content: data[0].content,
    create_at: data[0].create_at,
    id: data[0].id,
    imgUrl: data[0].img_url,
    latitude: data[0].latitude,
    like_cnt: data[0].like_cnt,
    longitude: data[0].longitude,
    placeName: data[0].place_name,
    region: data[0].region,
    user_id: data[0].user_id,
  };
};

//특정 id를 가진 글 카테고리
export const getCategories = async ({ queryKey }) => {
  const { data, error } = await supabase
    .from('POST_CATEGORY')
    .select('category_id')
    .eq('post_id', queryKey[1]);
  if (error) {
    throw new Error(error.message);
  }
  return data ? data : [];
};

//유저아이디를 이용해 프로필사진 가져오기
export const getUserProfile = async ({ queryKey }) => {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', queryKey[1])
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
  const { data: POST_LIKE, error } = await supabase
    .from('POST_LIKE')
    .select('*')
    .eq('user_id', queryKey[1]);
  const postIdList = POST_LIKE.map((post) => {
    return post.post_id;
  });
  const postList = await getPostByIdIn(postIdList);

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

// delete
export const deletePost = async (postId) => {
  const { data, error } = await supabase.from('POST').delete().eq('id', postId);
  if (error) {
    throw new Error(error.message);
  }
  return;
};

//좋아요 조회
export const existLike = async ({ queryKey }) => {
  let { data: likeData, error } = await supabase
    .from('POST_LIKE')
    .select('id')
    .eq('user_id', queryKey[1])
    .eq('post_id', queryKey[2]);

  if (error) {
    throw new Error(error.message);
  }

  return !!likeData[0];
};

//좋아요 생성
export const createLike = async ({ userId, postId }) => {
  const { data, error } = await supabase
    .from('POST_LIKE')
    .insert([{ user_id: userId, post_id: postId }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

//좋아요 삭제
export const deleteLike = async ({ userId, postId }) => {
  const { error } = await supabase
    .from('POST_LIKE')
    .delete()
    .eq('user_id', userId)
    .eq('post_id', postId);

  if (error) {
    throw new Error(error.message);
  }
};

//좋아요 카운트 업데이트
export const updateLikeCnt = async ({ postId, cnt }) => {
  const { data, error } = await supabase
    .from('POST')
    .select('like_cnt')
    .eq('id', postId);

  if (!error) {
    await supabase
      .from('POST')
      .update({ like_cnt: data[0].like_cnt + cnt })
      .eq('id', postId)
      .select();
  } else {
    throw new Error(error.message);
  }

  return cnt;
};
