import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import supabase from '../../config/supabase';

const TAG_LIST = [
  { id: 0, data: '#반려동물' },
  { id: 1, data: '#한적한' },
  { id: 2, data: '#놀이터' },
  { id: 3, data: '#운동기구' },
  { id: 4, data: '#야경명소' },
  { id: 5, data: '#낮에좋은' },
  { id: 6, data: '#자전거' },
  { id: 7, data: '#소풍' },
];

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

  // 유즈스테이트로 선택된 태그들의 배열을 만들고 해당 배열의 길이가 2를 넘지 않게 하면 됨
  // 온체인지로 유즈스테이트로 만든 셋배열에 담아주는 함수를 온체인지에 전달
  // 이 함수를 하려면 기존 배열의 길이가 2를 넘지 않는지 확인하고 2를 넘으면 체크박스 못넘게 알림창같은거
  // 2를 넘지 않으면 set배열에 담아주면 됨
  const navigate = useNavigate();

  // 체크된 태그를 넣을 빈 배열
  const [checkedList, setCheckedList] = useState([]);

  // 태그 온체인지 이벤트 감지, 값 받아오기
  const onCheckedTag = (checked, item) => {
    if (checked && checkedList.length < 2) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
    }
  };
  console.log(checkedList);

  return (
    <div>
      <h1>산책 리뷰 작성</h1>
      <section>
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
          {TAG_LIST.map((item) => {
            return (
              <label key={item.id}>
                <input
                  type="checkbox"
                  name="tags"
                  value={item.data}
                  id={item.id}
                  onChange={(e) => {
                    onCheckedTag(e.target.checked, e.target.value);
                  }}
                  checked={checkedList.includes(item.data) ? true : false}
                />
                {item.data}
              </label>
            );
          })}
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
