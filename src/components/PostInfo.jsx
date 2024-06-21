import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Likes from '../components/Likes';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api/supabasePost';

const PostInfo = ({ post, user }) => {
  const {
    data,
    isPending: isPendingPost,
    error: errorPost,
  } = useQuery({
    queryKey: ['userProfile', post.user_id],
    queryFn: getUserProfile,
  });

  return (
    <>
      <div className="flex justify-center items-end mb-6 gap-3">
        <div className="flex gap-5">
          <img className="w-5" src="/images/pointer.png" alt="pin-img" />
          {!post?.placeName || (
            <h1 className="text-2xl font-bold">{post?.placeName}</h1>
          )}
        </div>
        <p className="text-gray-600">{post?.address}</p>
      </div>

      <div className="mx-auto mb-6 border-none flex justify-center">
        <img src={post?.imgUrl} alt="review-pics" />
      </div>

      <div className="text-base flex items-center justify-between p-4">
        <div className="text-base flex items-center">
          <img
            src={data?.profile_image_url}
            alt="User"
            className="w-10 h-10 rounded-full mr-4"
          />
          <p>{data?.nickname}</p>
        </div>
        <Likes post={post} />
      </div>
    </>
  );
};

export default PostInfo;
