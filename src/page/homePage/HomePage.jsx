import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import KakaoMapWithPost from '../../components/kakao/KakaoMapWithPost';
import PostItem from '../../components/posts/PostItem';
import SearchForm from '../../components/posts/SearchForm';
import useFetchHomePagePost from '../../hooks/useFetchHomePagePost';
import useListStore from '../../zustand/listStore.js';

const HomePage = () => {
  const { setKeyword } = useListStore((state) => state);

  const navigate = useNavigate();
  const { postList, popularPostList } = useFetchHomePagePost();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    setKeyword(searchQuery);
    navigate('/list');
  };

  const truncateWithEllipsis = (text, maxLength) => {
    if (!text) {
      return '';
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <div className="max-w-1080 mx-auto my-20 px-10">
      <section>
        <SearchForm
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <KakaoMapWithPost postList={postList} />
      </section>

      <section className="mt-20">
        <h3 className="font-bold text-center text-2xl">
          내 위치 인기 많은 장소
        </h3>

        <span className="block text-right">
          <Link to="/list">더 보기</Link>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {popularPostList.map((post) => (
            <PostItem
              key={post.id}
              post={post}
              truncateWithEllipsis={truncateWithEllipsis}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
