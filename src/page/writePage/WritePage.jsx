import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import supabase from '../../config/supabase';

function WritePage() {
  //   const FetchData = () => {
  //     useEffect(() => {
  //       const fetchData = async () => {
  //         const { data, error } = await supabase.from('gildongmu').select('*');
  //         if (error) {
  //           console.log('에러 => ', error);
  //         } else {
  //           console.log('데이터 => ', data);
  //         }
  //       };
  //     }, []);
  //   };
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  console.log(search);
  return (
    <div>
      <h1>산책 리뷰 작성</h1>
      <section>
        <select name="도" id="do">
          <option value="경기도">경기도</option>
          <option value="서울">서울</option>
          <option value="강원도">강원도</option>
          <option value="충청도">충청도</option>
          <option value="전라도">전라도</option>
          <option value="경상도">경상도</option>
          <option value="제주도">제주도</option>
        </select>
        <input
          type="text"
          placeholder="산책하고 싶은 곳을 검색하세요."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button>
          <img src="" alt="" />
        </button>
        <div>지도 부분</div>
      </section>
      <section>
        <div>
          <img src="#" alt="" />
          <h2>지도에서 선택한 장소이름</h2> <span>주소</span>
        </div>
        <div>
          <img src="#" alt="" />
        </div>
        <form>
          <textarea placeholder="글을 입력해주세요." />
          <input type="checkbox" name="tags" value="반려동물 동반" /> #반려동물
          동반
          <input type="checkbox" name="tags" value="한적한" /> #한적한
          <input type="checkbox" name="tags" value="놀이터" /> #놀이터
          <input type="checkbox" name="tags" value="운동기구" />
          #운동기구
          <input type="checkbox" name="tags" value="야경명소" /> #야경명소
          <input type="checkbox" name="tags" value="낮에좋은" /> #낮에좋은
          <input type="checkbox" name="tags" value="자전거" /> #자전거
          <input type="checkbox" name="tags" value="소풍" /> #소풍
          <button
            type="submit"
            onClick={() => {
              navigate('/detail'); // 임시로 걸어놓음 (클릭 시 작성 완료한 상세페이지로 이동해야 함')
            }}
          >
            완료
          </button>
        </form>
      </section>
    </div>
  );
}

export default WritePage;
