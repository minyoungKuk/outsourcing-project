import Categories from '../../components/list/Categories.jsx';
import { getPostList } from '../../api/listApi.js';
import { useInfiniteQuery } from '@tanstack/react-query';
import SearchForm from '../../components/posts/SearchForm.jsx';
import { useEffect, useRef, useState } from 'react';
import PostItem from '../../components/posts/PostItem.jsx';
import NotFindSearch from '../../components/list/NotFindSearch.jsx';
import useListStore from '../../zustand/listStore.js';
import Spinner from '../../common/components/Spinner.jsx';

const ListPage = () => {
  const { keyword: homeKeyword } = useListStore((state) => state);

  const inputRef = useRef('');

  const [keyword, setKeyword] = useState('');
  const [requestKeyword, setRequestKeyword] = useState('');
  const [categoryList, setCategoryList] = useState([
    { id: 0, data: '#반려동물', isSelect: false },
    { id: 1, data: '#한적한', isSelect: false },
    { id: 2, data: '#놀이터', isSelect: false },
    { id: 3, data: '#운동기구', isSelect: false },
    { id: 4, data: '#야경명소', isSelect: false },
    { id: 5, data: '#낮에좋은', isSelect: false },
    { id: 6, data: '#자전거', isSelect: false },
    { id: 7, data: '#소풍', isSelect: false },
  ]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['postList', {
      keyword: requestKeyword,
      categoryList: categoryList.filter(category => category.isSelect).map(
        category => category.data),
      limit: 10, // 한 페이지에 불러올 게시물 수
    }],
    queryFn: getPostList,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
  });

  const search = (e) => {
    e.preventDefault();
    setRequestKeyword(inputRef.current.value);
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

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2
        && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    setKeyword(homeKeyword);
    setRequestKeyword(homeKeyword);
  }, [homeKeyword]);

  return (
    <div
      className={'max-w-1080 mx-auto my-20 px-10 flex flex-col mt-20 gap-14 pb-32'}>
      <div className={'flex flex-col gap-10 mx-auto'}>
        {requestKeyword && (
          <div className={'mx-auto'}>
            <div
              className={'w-full h-12 font-sans not-italic text-4xl font-extrabold leading-10 text-center text-[#5E5E5E]'}>
              {
                data?.pages[0].data.length !== 0 ?   `'${requestKeyword}' 검색결과` :  `'${requestKeyword}' 검색 대한 결과가 없습니다.`
              }
            </div>
            <div className={'w-full border-2  border-sky-400'} />
          </div>
        )}
        <SearchForm handleSearch={search} searchQuery={keyword}
                    setSearchQuery={setKeyword} inputRef={inputRef} />
        <Categories categoryList={categoryList}
                    setCategoryList={setCategoryList} setKeyword={setKeyword} />
      </div>
      {

        isPending ? <Spinner /> :
          data?.pages[0].data.length !== 0 ?
            <div className={'grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'}>
              {data?.pages.map((page) =>
                page.data.map(post => (
                  <PostItem key={post.id} post={post}
                            truncateWithEllipsis={truncateWithEllipsis} />
                )),
              )}
            </div> : <NotFindSearch />

      }

      {isFetchingNextPage &&  <Spinner />}
    </div>
  );
};

export default ListPage;