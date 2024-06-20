import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabase';

//전체 포스트 정보
export const getAllPosts = async () => {
  const { data: allData, error } = await supabase.from('POST').select('*');
  //   console.log('alldata ->', allData);
  if (error) {
    throw new Error(error.message);
  }

  return allData;
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
  return data[0];
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
  return data[0];
};

//유저아이디를 이용해 프로필사진 가져오기
export const getUserProfile = async ({ queryKey }) => {
  degubber;
  console.log(queryKey[1]);
  const { data, error } = await supabase
    .from('user')
    .select('profile_image_url', 'nickname')
    .eq('id', queryKey[1]);

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);

  return data;
};

// create
export const createDetail = async (post) => {
  const { data, error } = await supabase.from('POST').insert(post);
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
export const deletePost = async (postId) => {
  const { data, error } = await supabase.from('POST').delete().eq('id', postId);
  if (error) {
    throw new Error(error.message);
  }
  return;
};
