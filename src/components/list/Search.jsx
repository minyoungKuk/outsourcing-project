import useListStore from '../../zustand/listStore.js';
import { useState } from 'react';

function Search() {

  const [keyword, setKeyword] = useState();

  const { listPageState } = useListStore((state) => state);

  const search = () => {

  };

  return (
    <div
      className={'w-full flex flex-col content-center justify-center gap-10'}>
      <form onSubmit={search}
            className={'w-854 h-14 drop-shadow-lg flex gap-6'}>
        <input className={'w-600 h-14 bg-white rounded-3xl pl-4 drop-shadow'}
               placeholder={'키워드를 입력해주세요.'} />
        <button type={'submit'} />
      </form>
    </div>
  );
}

// <div className={'mx-auto'}>
//   <div
//     className={'w-full h-12 font-sans not-italic text-4xl font-extrabold leading-10 text-center text-[#5E5E5E]'}>{'방화수류정'} 검색결과
//   </div>
//   <div className={'w-full border-2  border-sky-400'} />
// </div>

export default Search;