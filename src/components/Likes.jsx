import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

// const updateLike = async ({ id, liked }) => {
//   // Simulate a fetch request to update the like status
//   const response = await fetch(`/api/like/${id}`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ liked }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to update like');
//   }

//   return response.json();
// };

const Likes = ({ id, initialLiked }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    onMutate: async ({ id, liked }) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(['like', id]);

      // Snapshot the previous value
      const previousLike = queryClient.getQueryData(['like', id]);

      // Optimistically update to the new value
      queryClient.setQueryData(['like', id], { id, liked });

      // Return a context object with the snapshotted value
      return { previousLike };
    },
    onError: (err, { id }, context) => {
      // Rollback to the previous value if the mutation fails
      queryClient.setQueryData(['like', id], context.previousLike);
    },
    onSettled: (data, error, { id }) => {
      // Always refetch after error or success
      queryClient.invalidateQueries(['like', id]);
    },
  });

  const handleLikeClick = () => {
    mutation.mutate({ id, liked: !initialLiked });
  };

  return (
    <button
      onClick={handleLikeClick}
      className={`w-10 h-10 flex items-center justify-center rounded-full border ${
        initialLiked
          ? 'border-red-500 text-red-500'
          : 'border-gray-300 text-gray-600'
      } transition-colors duration-300 focus:outline-none`}
    >
      {initialLiked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.488 6.488 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19.5 13.57L12 21.35l-7.5-7.78C1.61 11.79.38 8.49 2.61 6.16a5.587 5.587 0 0 1 7.88 0l.5.51.51-.51a5.587 5.587 0 0 1 7.88 0c2.23 2.33 1 5.63-1.88 7.41z"></path>
        </svg>
      )}
    </button>
  );
};

export default Likes;
