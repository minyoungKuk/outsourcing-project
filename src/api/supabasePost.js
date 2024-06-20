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
export const getDetails = async (id) => {
  const { data, error } = await supabase.from('POST').select('*').eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
};
// read - 전체 포스트
export const getAllPosts = async () => {
  const { data: allData, error } = await supabase.from('POST').select('*');
  if (error) {
    throw new Error(error.message);
  }
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
