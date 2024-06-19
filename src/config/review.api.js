import { useEffect, useState } from 'react';

const AddReview = async (newReview) => {
  const { data, error } = await supabase
    .from('POST_CATEGORY')
    .insert(newReview)
    .select();
  if (error) {
    console.log('에러 => ', error);
  }
};
export default AddReview;
