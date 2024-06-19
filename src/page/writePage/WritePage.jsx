import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddReview from '../../config/review.api';

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

  const [checkedList, setCheckedList] = useState([]);

  const onCheckedTag = (checked, item) => {
    if (checked && checkedList.length < 2) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
    }
  };
  console.log(checkedList);

  const onSubmitBtn = async (e) => {
    e.preventDefault();
    // 1. 게시물 추가  -> supabase로 게시물 추가하기 .select()
    // const { data, error } = await supabase.from("posts").insert(추가할데이터).select()
    // 아마도 data.id => post_id

    // 2. POST_CATEGORY
    // const { data, error } = await supabase
    //   .from('POST_CATEGORY')
    //   .insert([
    //     { post_id: data.id, category_id1: '123123' },
    //     {
    //       post_id: data.id,
    //       category_id1: '123123123123123',
    //     },
    //   ])
    //   .select();

    // checkedList
    // [{ id: 1, data: '#한적한' }, { id: 2, data: '#놀이터' }]
    const toInsertData = checkedList.map((item) => {
      return {
        post_id: '123123',
        category_id1: item.id,
      };
    });
    // toInsertData
    // [
    //   { post_id: '123123', category_id1: 1 },
    //   { post_id: '123123', category_id1: 2 },
    // ];
    // await AddReview(newReview);
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
    <div className="mx-auto mt-20 w-9/12 bg-slate-200">
      <h1 className="text-4xl font-black text-gray-700 ">산책 리뷰 작성</h1>
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
          <textarea
            name="content"
            placeholder="글을 입력해주세요."
            className="w-3/4"
          />
          <div>
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
          </div>
          <button type="submit" onClick={onSubmitBtn}>
            완료
          </button>
        </form>
      </section>
    </div>
  );
}

export default WritePage;
