import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { supabase } from '../../config/supabase';
import KakaoMapWithAddressSearchOfCreatePage from '../kakaoMapExamplePage/KakaoMapWithAddressSearchOfCreatePage';

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
  const [checkedList, setCheckedList] = useState([]);
  // const handleCheckboxChange = () => {
  //   // 체크박스가 체크 됐다면
  //   setIsChecked(!isChecked);
  //   console.log(isChecked);
  // };
  const [review, setReview] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReviews();
        setReview(data);
      } catch (error) {
        console.log('에러 => ', error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const onCheckedTag = (checked, item) => {
    if (checked && checkedList.length < 4) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
    }
  };
  console.log(checkedList);
  const onSubmitBtn = async (e) => {
    e.preventDefault();
    const toInsertData = checkedList.map((item) => {
      return {
        post_id: '123123',
        category_id1: item.id,
      };
    });
    const { data, error } = await supabase
      .from('POST_CATEGORY')
      .insert([
        // { post_id: '123123', category_id1: '123123' },
        // {
        //   post_id: '123123',
        //   category_id1: '123123123123123',
        // },
      ])
      // .insert(toInsertData)
      .select();
    if (error) {
      console.log('에러 => ', error);
    }
    navigate('/detail'); // 임시로 걸어놓음 (클릭 시 작성 완료한 상세페이지로 이동해야 함')
  };
  return (
    <div className="max-w-1080 mx-auto my-20 px-10 h-auto text-center bg-slate-100">
      <h1 className="text-3xl font-black text-gray-700 text-center mb-12">
        산책 리뷰 작성
      </h1>
      <section className="max-w-1080">
        {/* 검색창 삽입 */}
        <div className="max-w-1080 bg-slate-400 h-96">
          <KakaoMapWithAddressSearchOfCreatePage />
        </div>
      </section>
      <section>
        <div className="flex mb-8 mt-16 content-end">
          <img
            src="public\images\location-icon.png"
            alt="location-icon"
            className="h-10 mr-3"
          />
          <h2 className="text-2xl font-black text-gray-700 mr-3">
            지도에서 선택한 장소이름
          </h2>
          <span className="text-sm text-slate-400 leading-10">
            경기도 수원시 장안구
          </span>
        </div>
        <div>
          <img src="#" alt="" />
        </div>
        <form>
          <textarea
            name="content"
            placeholder="글을 입력해주세요."
            className="w-full h-60 px-4 py-2 border-2"
          />
          <div className="my-8">
            {TAG_LIST.map((item) => {
              const isChecked = checkedList.includes(item.data);
              return (
                <label
                  key={item.id}
                  className={`px-5 py-3 ml-3 cursor-pointer rounded-full text-white
                    ${isChecked ? 'bg-primary' : 'bg-secondary'}`}
                >
                  <input
                    type="checkbox"
                    name="tags"
                    className="hidden"
                    value={item.data}
                    id={item.id}
                    onChange={(e) => {
                      onCheckedTag(e.target.checked, item.data);
                    }}
                    checked={isChecked}
                  />
                  {item.data}
                </label>
              );
            })}
          </div>
          <button
            type="submit"
            className="w-72 h-12 text-lg mt-12 bg-sub text-primary font-black border-primary border-2 "
            onClick={onSubmitBtn}
          >
            완료
          </button>
        </form>
      </section>
    </div>
  );
}
export default WritePage;
