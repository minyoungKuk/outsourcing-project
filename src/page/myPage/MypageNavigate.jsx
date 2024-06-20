import React from 'react';
import { useNavigate } from 'react-router-dom';

const MypageNavigate = () => {
  const navigate = useNavigate();
  // 현재 경로에 따라 버튼 클래스 동적으로 할당
  const getButtonClass = (path) => {
    return location.pathname === path
      ? 'm-4 p-2 border rounded-[7px] font-bold  bg-primary text-white' // 현재 페이지 스타일
      : 'm-4'; // 기본 스타일
  };

  return (
    <div className="flex">
      <button
        onClick={() => navigate('/my-page')}
        className={getButtonClass('/my-page')}
      >
        프로필 수정
      </button>
      <button
        onClick={() => navigate('/my-list-page')}
        className={getButtonClass('/my-list-page')}
      >
        내가 쓴 글
      </button>
      <button
        onClick={() => navigate('/my-like-page')}
        className={getButtonClass('/my-like-page')}
      >
        좋아요 한 글
      </button>
    </div>
  );
};

export default MypageNavigate;
