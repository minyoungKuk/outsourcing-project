import supabase from '../config/supabase';

export const getDetails = async () => {
  let { data } = await supabase
    .from('POST')
    .select('*')
    .eq('id', 'a3d0a38e-b023-45f8-871a-2e5ed835ec08');
  return data[0];
};

export const getAllPosts = async () => {
  let { data: allData } = await supabase.from('POST').select('*');
  console.log('alldata ->', allData);

  return allData;
};
