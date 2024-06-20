import { useQuery } from '@tanstack/react-query';
import { getLikePostList } from '../../api/supabasePost';
import PostItem from '../../components/posts/PostItem';
import useAuthStore from '../../zustand/authStore';
import MyNotFindSearch from './MyNofindSearch';
import MypageNavigate from './MypageNavigate';
import Spinner from '../../common/components/Spinner.jsx';

const MyLikePage = () => {
  const { user } = useAuthStore();
  const truncateWithEllipsis = (text, maxLength) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  const {
    data: likeList,
    isPending: isPendingPost,
    error: errorPost,
  } = useQuery({
    queryKey: ['likeList', user.id],
    queryFn: getLikePostList,
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

        {

          likeList.length === 0 ? (
          <MyNotFindSearch />
        ) : (
            isPendingPost ? <Spinner/> : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {likeList?.map((post) => {
                  return (
                    <PostItem
                      key={post.id}
                      post={post}
                      truncateWithEllipsis={truncateWithEllipsis}
                    ></PostItem>
                  );
                })}
              </div>)
        )
        }
      </div>
    </>
  );
};

export default MyLikePage;
