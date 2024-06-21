import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDetail, createPostCategory } from '../../api/supabasePost';
import KakaoMapWithAddressSearch
  from '../../components/kakao/KakaoMapWithAddressSearch';
import { useModal } from '../../context/modal.context';
import uploadFile from '../../utils/uploadFile';
import useAuthStore from '../../zustand/authStore';
import useKakaoMapStore from '../../zustand/kakaoMapStore';

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
  const { user } = useAuthStore();
  const { map, setMap } = useKakaoMapStore((state) => state);
  const [checkedList, setCheckedList] = useState([]);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const inputRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const modal = useModal();

  useEffect(() => {
    return () => {
      setMap({
        longitude: 0,
        latitude: 0,
        placeName: '',
        address: '',
        region: '',
      });
    };
  }, []);

  const openModal = (content) => {
    modal.open({
      content: content,
      type: 'alert',
    });
  };
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
  const createMutation = useMutation({
    mutationFn: createDetail,
    onSuccess: async (data) => {
      if (!data || data.length === 0) {
        console.error('데이터가 비어있습니다.');
        return;
      }
      const postId = data.id;
      const insertList = checkedList.map((checked) => ({
        post_id: postId,
        category_id: checked,
      }));
      try {
        const categoryResponse = await createPostCategory(insertList);
        if (categoryResponse) {
          openModal('업로드 되었습니다.');
          navigate(`/list`);
          queryClient.invalidateQueries('allPosts');
          setContent('');
          setFile(null);
          setImgUrl('');
          setCheckedList([]);
        } else {
          console.error('카테고리 응답 오류', categoryResponse);
        }
      } catch (error) {
        console.error('카테고리 생성 오류', error);
      }
    },
    onError: (error) => {
      console.log('에러', error);
    },
  });
  const create = async (e) => {
    e.preventDefault();
    const fileImgUrl = await uploadFile(file, 'post_img');
    if (!file) {
      openModal('사진을 첨부해주세요.');
    } else if (checkedList.length === 0) {
      openModal('태그를 선택해주세요.');
    } else if (content === '') {
      openModal('글을 작성해주세요.');
    } else if (map.address === '') {
      openModal('위치를 선택해주세요.');
    } else {
      createMutation.mutate({
        user_id: user.id,
        content: content,
        place_name: map.placeName,
        address: map.address,
        region: map.region,
        latitude: map.latitude,
        longitude: map.longitude,
        img_url: fileImgUrl,
      });
    }
  };
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
            src="/images/location-icon.png"
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
              src="/images/img_upload.png"
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
