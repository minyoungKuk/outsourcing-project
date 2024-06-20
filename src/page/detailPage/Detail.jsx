import { useEffect, useState } from 'react';
import PostInfo from '../../components/PostInfo';
import KakaoMap from '../../components/kakao/KakaoMap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../../zustand/authStore';
import {
  deletePost,
  getAllPosts,
  getCategories,
  getDetails,
  updateDetail,
} from '../../api/supabasePost';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const { isAuthenticated, user } = useAuthStore();

  const {
    data: post,
    isPending: isPendingPost,
    error: errorPost,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: getDetails,
    onSuccess: (data) => {
      setContent(data?.content || '');
      setImgUrl(data?.img_url || '');
    },
  });

  const {
    data: categories,
    isPending: isPendingCategory,
    error: errorCategory,
  } = useQuery({ queryKey: ['category', id], queryFn: getCategories });

  const mutationDelete = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      alert('삭제가 완료되었습니다.');
      navigate('/');
    },
  });

  const {
    data: allPosts,
    isPending: isPendingAllPosts,
    error: errorAllPosts,
  } = useQuery({ queryKey: ['allPost'], queryFn: getAllPosts });

  const updateMutation = useMutation({
    mutationFn: updateDetail,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', id]);
      queryClient.invalidateQueries('allPost');
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('에러', error);
    },
  });

  const handleUpdate = () => {
    if (post) {
      updateMutation.mutate({
        id: post.id,
        content,
        img_url: imgUrl,
      });
    }
    setContent('');
    setImgUrl('');
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [filteredAddresses, setFilteredAddresses] = useState([]);

  useEffect(() => {
    if (allPosts && post) {
      setFilteredAddresses(
        allPosts?.filter((item) => item.address === post.address),
      );
    }
  }, [allPosts, post]);

  const handleDelete = () => {
    if (window.confirm('정말 해당 게시글을 삭제하시겠습니까?')) {
      if (user) {
        mutationDelete.mutate(id);
      } else {
        alert('로그인이 필요합니다.');
      }
    } else {
      alert('삭제가 취소되었습니다.');
    }
  };

  if (isPendingPost) return <p>Loading post...</p>;
  if (errorPost) return <p>Error loading post: {errorPost.message}</p>;

  return (
    <div className="p-4 mx-auto max-w-[1080px] mt-10">
      {errorPost && <div>Error: {errorPost.message}</div>}
      {isPendingPost && <div>Loading...</div>}
      {post && (
        <>
          <PostInfo post={post} user={user} />
          <div className="mb-6 grid grid-cols-2 justify-between items-center p-8 gap-4">
            <p className="items-center bg-primary rounded-lg py-0.5 px-2 text-xs">
              {categories ? categories.category_id : null}
            </p>
            {isAuthenticated && (
              <div className="text-sm">
                {isEditing ? (
                  <div className="mt-6">
                    <h2 className="text-xl font-bold mb-4">리뷰 수정</h2>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-2 mb-4 border rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-2 mb-4 border rounded"
                    />
                    {imgUrl && (
                      <img src={imgUrl} alt="Review" className="w-full mb-4" />
                    )}
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-primary text-white rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="ml-2 px-4 py-2 bg-gray-500 text-white rounded"
                    >
                      취소
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="text-lg leading-snug mb-4">{post.content}</p>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                      수정
                    </button>
                    <button
                      onClick={handleDelete}
                      className="text-gray-600 hover:text-gray-800 ml-2"
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-6">리뷰장소 위치</h2>
            <KakaoMap
              latitude={post?.latitude}
              longitude={post?.longitude}
            ></KakaoMap>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-6">이 곳의 다른 리뷰</h2>
            <div className="grid grid-cols-3 gap-5 overflow-x-auto">
              {filteredAddresses?.map((item) => (
                <Link
                  to={`/detail/${item.id}`}
                  key={item.id}
                  className="relative w-[300px] h-full group"
                >
                  {item.img_url && (
                    <img
                      src={item.img_url}
                      alt="Other Reviews"
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 text-white p-4">
                    <span className="text-md leading-snug mb-1 overflow-hidden text-ellipsis line-clamp-5 whitespace-pre-line">
                      {item.content}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
