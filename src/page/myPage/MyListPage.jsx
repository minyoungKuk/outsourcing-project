import { useQuery } from '@tanstack/react-query';
import { getMyPostList } from '../../api/supabasePost';
import PostItem from '../../components/posts/PostItem';
import useAuthStore from '../../zustand/authStore';
import MyNotFindSearch from './MyNofindSearch';
import MypageNavigate from './MypageNavigate';

const MyListPage = () => {
  const { user } = useAuthStore();

  const truncateWithEllipsis = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
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
      <div className="border border-secondary max-w-1080 mx-auto border-t-0 border-b-0 px-10 h-auto pb-40">
        <MypageNavigate />

        {posts?.length === 0 ? (
          <MyNotFindSearch />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            {posts.map((item) => (
              <PostItem
                key={item.id}
                post={item}
                truncateWithEllipsis={truncateWithEllipsis}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyListPage;
