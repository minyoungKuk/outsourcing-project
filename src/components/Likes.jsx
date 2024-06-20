import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../zustand/authStore';
import { useModal } from '../context/modal.context';
import SignInPage from '../page/login/SignInPage';

const Likes = ({ initialLiked }) => {
  const modal = useModal();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikeCount = async () => {
      const response = await fetch(`/api/likeCount/${user?.id}`);
      const data = await response.json();
      setLikeCount(data.likeCount);
    };

    fetchLikeCount();
  }, [user?.id]);

  const mutation = useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(['likeCount', user?.id]);
      const previousCount = queryClient.getQueryData(['likeCount', user?.id]);
      queryClient.setQueryData(
        ['likeCount', user?.id],
        (prevCount) => prevCount + (liked ? -1 : 1),
      );
      return { previousCount };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['likeCount', user?.id], context.previousCount);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['likeCount', user?.id]);
    },
  });

  const handleLikeClick = async () => {
    if (!user) {
      modal.open({
        type: 'login',
        content: <SignInPage />,
      });
    } else {
      setLiked(!liked);
      await mutation.mutateAsync();
      const response = await fetch(`/api/likeCount/${user?.id}`);
      const data = await response.json();
      setLikeCount(data.likeCount);
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
