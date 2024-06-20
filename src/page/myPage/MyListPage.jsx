import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMyPostList } from '../../api/supabasePost';
import PostItem from '../../components/posts/PostItem';
import useAuthStore from '../../zustand/authStore';
import MyNotFindSearch from './MyNofindSearch';

const MyListPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  console.log(user);

  const truncateWithEllipsis = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  // 현재 경로 확인하여 클래스명 동적 할당
  const getButtonClass = (path) => {
    return location.pathname === path
      ? 'm-4 p-2 border rounded-[7px] font-bold bg-primary text-white' // 현재 페이지일 때 스타일
      : 'm-4'; // 기본 스타일
  };

  const {
    data: posts,
    isPending: isPendingPost,
    error: errorPost,
  } = useQuery({
    queryKey: ['posts', user.id],
    queryFn: getMyPostList,
  });

  if (isPendingPost) {
    return <div>loading...</div>;
  }
  if (errorPost) {
    console.log(errorPost);
    return <div></div>;
  }

  return (
    <>
      <div className="border border-black border-t-0 border-b-0 mr-40 ml-40 h-auto pb-40">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
          {posts?.length > 0 ? (
            posts.map((item) => (
              <PostItem
                key={item.id}
                post={item}
                truncateWithEllipsis={truncateWithEllipsis}
              />
            ))
          ) : (
            <div>
              {' '}
              <MyNotFindSearch />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyListPage;
