import React from 'react';

const ReviewContent = ({ post }) => {
  return (
    <>
      <p className="mb-6 p-8">{post?.content}</p>
      <div className="mb-6 flex justify-between items-center p-8">
        <p className="items-center bg-primary rounded-lg py-0.5 px-2 text-xs">
          #반려견동반
        </p>
        <div className="text-sm">
          <button className="text-gray-600 hover:text-gray-800 ml-4">
            수정
          </button>
          <button className="text-gray-600 hover:text-gray-800 ml-2">
            삭제
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewContent;
