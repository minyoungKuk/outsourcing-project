import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../../config/supabase.js';
import uploadFile from '../../utils/uploadFile.js';

const MyPageEdit = () => {
  // 상태 관리

  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [newNickname, setNewNickname] = useState(user?.nickname ?? '');
  const navigate = useNavigate();
  const location = useLocation();
  const userId = '7bae1395-036a-4799-8788-24b9d0d2dee5';
  const queryClient = useQueryClient();
  // 이미지 미리보기 함수
  const saveFileImage = (img) => {
    setImage(img);
    const fileUrl = URL.createObjectURL(img);
    setImgSrc(fileUrl);
  };

  // 현재 경로에 따라 버튼 클래스 동적으로 할당
  const getButtonClass = (path) => {
    return location.pathname === path
      ? 'm-4 p-2 border rounded-[7px] font-bold  bg-primary text-white' // 현재 페이지 스타일
      : 'm-4'; // 기본 스타일
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase
        .from('user')
        .select()
        .eq('id', userId); //  << 유저 아이디 콘솔로 보고 필요한 값 꺼내기

      setUser(userData[0]);
    };
    fetchUser();
  }, []);

  // sessionData.session.user.id 나중에 쓰기 이거 유저정보 가져오는 로직에 eq: id 뒤번 에 넣기
  useEffect(() => {
    setNewNickname(user?.nickname);
    setImgSrc(user?.profile_image_url);
  }, [user]);

  // 닉네임 중복 확인 함수
  const handleNicknameCheck = async () => {
    try {
      const { data, error } = await supabase
        .from('user')
        .select('nickname')
        .eq('nickname', newNickname);
      if (error) {
        console.error(error);
        return;
      }
      if (data && data.length > 0) {
        alert('이미 사용 중인 닉네임입니다.');
      } else {
        alert('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지, 닉네임 수정하는 함수
  const handleEditProfile = async (e) => {
    e.preventDefault();
    const profileImageUrl = image;

    const profileImageFileName = await uploadFile(
      profileImageUrl,
      'profile_image',
    );

    const { data, error } = await supabase
      .from('user')
      .update({
        nickname: newNickname,
        profile_image_url: profileImageFileName,
      })
      .eq('id', userId);
    console.log(data);
    if (error) {
      console.error('수정 오류', error);
      return;
    }

    alert('프로필수정이 완료되었습니다.');
    queryClient.invalidateQueries(['userProfile']);
  };
  // 일단 프로필 수정 끝...
  //
  return (
    <>
      <div className="border border-black border-t-0 border-b-0 mr-40 ml-40 h-auto pb-40">
        <div className="flex">
          <button
            onClick={() => navigate('/my-page')}
            className={getButtonClass('/my-page')}
          >
            프로필 수정
          </button>
          <button
            onClick={() => navigate('/my-list-page')}
            className={getButtonClass('/my-list-page')}
          >
            내가 쓴 글
          </button>
          <button
            onClick={() => navigate('/my-like-page')}
            className={getButtonClass('/my-like-page')}
          >
            좋아요 한 글
          </button>
        </div>
        {/* 전체 박스 */}
        <div className="pt-12 flex justify-center">
          {/* 회색박스 */}
          <div className="w-[1050px] h-[230px] bg-gray-200 relative flex">
            <div className="flex-grow flex items-center justify-center">
              {/* 이미지 미리보기 및 파일 입력 */}
              <form className="flex flex-col items-center">
                <img
                  src={imgSrc} //삼항연산자 축약   (~가 있으면 ?? ~를 보여줘라) 이유 : 중복되는 것이 있으니까
                  alt="미리보기"
                  className={` mb-4 w-32 h-32 object-cover rounded-full `}
                />
                <label
                  htmlFor="profile_image"
                  className="cursor-pointer text-white bg-primary p-3 rounded-[7px] font-bold"
                >
                  프로필 추가하기
                </label>
                <input
                  id="profile_image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    saveFileImage(e.target.files[0]);
                  }}
                  className="hidden"
                />
              </form>
            </div>

            {/* 이메일 및 닉네임 수정 */}
            <div className="flex-grow flex flex-col justify-center">
              {/* 이메일 : {user.email} */}
              <div className="mt-4 font-bold">이메일 : {user?.email}</div>
              <div className="mt-4 flex items-center font-bold">
                닉네임 수정 :
                <input
                  type="text"
                  value={newNickname}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="ml-2 p-1 border border-gray-300 rounded"
                />
                <button
                  onClick={handleNicknameCheck}
                  className="ml-2 px-4 py-2 bg-primary text-white rounded-[7px]"
                >
                  중복확인
                </button>
              </div>
            </div>

            {/* 수정 버튼 */}
            <div className="flex-grow flex items-end justify-center mb-4">
              <button
                onClick={handleEditProfile}
                className="px-4 py-2 bg-primary text-white rounded-[7px] font-bold"
              >
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPageEdit;
