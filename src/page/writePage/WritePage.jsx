import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoMapWithAddressSearchOfCreatePage from '../kakaoMapExamplePage/KakaoMapWithAddressSearchOfCreatePage';
import KakaoMapWithAddressSearch from '../../components/kakao/KakaoMapWithAddressSearch';
import useKakaoMapStore from '../../zustand/kakaoMap/kakaoMapStore';
import supabase from '../../config/supabase';
import uploadFile from '../../utils/uploadFile';

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
  const { map } = useKakaoMapStore((state) => state);
  const [checkedList, setCheckedList] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const inputRef = useRef();

  const navigate = useNavigate();

  const imgUpload = (e) => {
    const tempFile = e.target.files[0];
    setFile(tempFile);
    const fileUrl = URL.createObjectURL(tempFile);
    setImgUrl(fileUrl);
  };

  const onCheckedTag = (checked, item) => {
    if (checked && checkedList.length === 4) {
      alert('태그는 최대 4개까지 선택할 수 있습니다.');
    } else if (checked && checkedList.length < 4) {
      setCheckedList([...checkedList, item]);
    } else if (!checked) {
      setCheckedList(checkedList.filter((element) => element !== item));
    }
  };

  console.log(checkedList);

  const create = async (e) => {
    e.preventDefault();
    const fileImgUrl = await uploadFile(file, 'post_img');
    supabase
      .from('POST')
      .insert([
        {
          user_id: '89895a0e-d365-4995-aa96-d1b2d68d9aa9', //임의의 값
          content: content,
          place_name: map.placeName,
          address: map.address,
          region: map.region,
          latitude: map.latitude,
          longitude: map.longitude,
          img_url: fileImgUrl,
        },
      ])
      .select()
      .then((response) => {
        if (!response.error) {
          debugger;
          const postId = response.data[0].id;

          const insertList = checkedList.map((checked) => {
            return {
              post_id: postId,
              category_id: checked,
            };
          });

          supabase
            .from('POST_CATEGORY')
            .insert(insertList)
            .select()
            .then((response) => {
              if (!response.error) {
                alert('저장되었습니다.');
              }
            });
        }
      });
    if (file === null) {
      alert('사진을 첨부해주세요.');
    } else if (checkedList.length === 0) {
      alert('태그를 1개 이상 선택해주세요');
    } else if (content === '') {
      alert('게시글을 작성해주세요.');
    } else if (map.address === '') {
      alert('리뷰할 장소를 선택해주세요.');
    }
  };
  console.log(map.address);
  return (
    <div className="max-w-1080 mx-auto my-20 px-10 h-auto text-center ">
      <h1 className="text-3xl font-black text-gray-700 text-center mb-12">
        산책 리뷰 작성
      </h1>
      <section className="max-w-1080 h-full">
        <KakaoMapWithAddressSearch />
      </section>
      <section>
        <div className="flex mb-4 mt-16 content-end">
          <img
            src="public\images\location-icon.png"
            alt="location-icon"
            className="h-10 mr-3"
          />
          <h2 className="text-2xl font-black text-gray-700 mr-3">
            {map.placeName}
          </h2>
          <span className="text-sm text-slate-400 leading-10">
            {map.address}
          </span>
        </div>
        <div>
          <img src="#" alt="" />
        </div>
        <form onSubmit={create}>
          <input
            type="file"
            className="w-full h-96 mb-8"
            hidden
            ref={inputRef}
            onChange={(e) => imgUpload(e)}
          />
          {file ? (
            <img
              src={imgUrl}
              alt=""
              onClick={() => {
                inputRef.current.click();
              }}
              className="w-full h-96 mb-8 bg-slate-300 cursor-pointer"
            />
          ) : (
            <img
              src="public\images\img_upload.png"
              alt=""
              onClick={() => {
                inputRef.current.click();
              }}
              className="w-full h-96 mb-8 bg-slate-300 cursor-pointer"
            />
          )}
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
          >
            완료
          </button>
        </form>
      </section>
    </div>
  );
}
export default WritePage;
