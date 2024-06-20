import { useEffect, useState } from 'react';
import PostInfo from '../../components/PostInfo';
import KakaoMap from '../../components/kakao/KakaoMap';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getDetails } from '../../api/detailApi';
import { Link, useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  const {
    data: post,
    isPending: isPendingPost,
    error: errorPost,
  } = useQuery({ queryKey: ['post'], queryFn: getDetails });

  const {
    data: allPosts,
    isPending: isPendingAllPosts,
    error: errorAllPosts,
  } = useQuery({ queryKey: ['allPost'], queryFn: getAllPosts });

  const [filteredAddresses, setFilteredAddresses] = useState([]);

  useEffect(() => {
    if (allPosts && post) {
      setFilteredAddresses(
        allPosts?.filter((item) => item.address === post.address),
        //유저가쓴 글이 있는 배열 만들기 -> 그 배열과 전체배열과 겹치는것 비교했을때 유저가 쓴 글이 있는 배열의 특정아이디가
        // 전체배열에 있는 요소들중 아디기 하나가 겹치면 걔를 빼준다.//
      );
    }
  }, [allPosts, post]);

  console.log(filteredAddresses);
  return (
    <div className="p-4 mx-auto max-w-[1080px] mt-10">
      <PostInfo post={post} />
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-6">리뷰장소 위치</h2>
        <KakaoMap
          latitude={post?.latitude}
          longitude={post?.longitude}
        ></KakaoMap>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-6">이 곳의 다른 리뷰</h2>
        <div className="flex space-x-4 overflow-x-auto gap-5">
          {filteredAddresses?.map((item, index) => (
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
    </div>
  );
};

export default Detail;
