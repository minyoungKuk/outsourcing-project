import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../zustand/authStore';
import { useModal } from '../context/modal.context';
import SignInPage from '../page/login/SignInPage';
import {
  createLike,
  deleteLike,
  existLike,
  updateLikeCnt,
} from '../api/supabasePost.js';

const Likes = ({ post }) => {
  const { user } = useAuthStore();

  const modal = useModal();
  const queryClient = useQueryClient();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  //좋아요 여부
  const {
    data: isLike,
  } = useQuery({
    queryKey: ['like', user?.id, post?.id],
    queryFn: existLike,
  });

  //좋아요여부
  useEffect(() => {
    setLiked(isLike);
  }, [isLike]);

  //좋아요 개수
  useEffect(() => {
    setLikeCount(post?.like_cnt);
  }, [post]);

  const { mutate: updateLikeCntMutate } = useMutation({
    mutationFn: updateLikeCnt,
    onSuccess: (cnt) => {
      if (cnt > 0) {
        createLikeMutate({ userId: user?.id, postId: post?.id });
      } else {
        deleteLikeMutate({ userId: user?.id, postId: post?.id });
      }
    },
  });

  const { mutate: createLikeMutate } = useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      // alert("데이터 삽입이 성공했습니다.");
      queryClient.invalidateQueries(['post']);
    },
  });

  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: deleteLike,
    onSuccess: () => {
      // alert("데이터 삽입이 성공했습니다.");
      queryClient.invalidateQueries(['post']);
    },
  });

  const handleLikeClick = async () => {
    if (!user) {
      modal.open({
        type: 'login',
        content: <SignInPage />,
      });
    } else {
      updateLikeCntMutate({ postId: post?.id, cnt: liked ? -1 : 1 });
      setLiked(!liked);
    }
  };

  return (
    <div className="flex">
      <button onClick={handleLikeClick}>
        <FontAwesomeIcon
          icon={liked ? fasHeart : farHeart}
          style={{
            color: liked ? '#ff5c5c' : '#878787',
            fontSize: '1.5rem',
          }}
        />
      </button>
      <span className="ml-2">{likeCount}</span>
    </div>
  );
};

export default Likes;
