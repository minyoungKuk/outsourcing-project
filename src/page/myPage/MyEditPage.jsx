import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Button from '../../common/components/Button';
import supabase from '../../config/supabase.js';
import { useModal } from '../../context/modal.context';
import uploadFile from '../../utils/uploadFile.js';
import MypageNavigate from './MypageNavigate';

const MyEditPage = () => {
  // 상태 관리
  const [imgSrc, setImgSrc] = useState(null);
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [newNickname, setNewNickname] = useState(user?.nickname ?? '');
  const queryClient = useQueryClient();
  const modal = useModal();

  // 이미지 미리보기 함수
  const saveFileImage = (img) => {
    setImage(img);
    const fileUrl = URL.createObjectURL(img);
    setImgSrc(fileUrl);
  };

  // 유저 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      const { data: getUserIdData, error: getUserIdError } =
        await supabase.auth.getSession();
      if (getUserIdError) {
        console.log(getUserIdError);
      }

      const { data: userData } = await supabase
        .from('user')
        .select()
        .eq('id', getUserIdData.session.user.id); //  << 유저 아이디 콘솔로 보고 필요한 값 꺼내기

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
        modal.open({
          content: '이미 사용중인 닉네임입니다.',
          type: 'alert',
        });
      } else {
        modal.open({
          content: '사용 가능한 닉네임입니다.',
          type: 'alert',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 이미지, 닉네임 수정하는 함수
  const handleEditProfile = async (e) => {
    e.preventDefault();

    const updates = {};

    if (newNickname && newNickname !== user.nickname) {
      updates.nickname = newNickname;
    }

    if (image) {
      const profileImageFileName = await uploadFile(image, 'profile_image');
      updates.profile_image_url = profileImageFileName;
    }

    if (Object.keys(updates).length > 0) {
      const { data, error } = await supabase
        .from('user')
        .update(updates)
        .eq('id', user.id);
      if (error) {
        console.error('수정 오류', error);
        return;
      }

      modal.open({
        content: '회원 정보 변경이 완료 되었습니다.',
        type: 'alert',
      });
      queryClient.invalidateQueries(['userProfile']);
    } else {
      modal.open({
        content: '변경 사항이 없습니다.',
        type: 'alert',
      });
    }
  };

  return (
    <>
      <div className="border border-secondary max-w-1080 mx-auto border-t-0 border-b-0 px-10 h-auto pb-40">
        <MypageNavigate />

        {/* 전체 박스 */}
        <div className="pt-12 flex flex-col justify-center">
          {/* 이미지 수정 */}
          <div className="flex-grow flex items-center justify-center">
            {/* 이미지 미리보기 및 파일 입력 */}
            <form className="flex flex-col items-center">
              <img
                src={imgSrc} //삼항연산자 축약   (~가 있으면 ?? ~를 보여줘라) 이유 : 중복되는 것이 있으니까
                alt="미리보기"
                className={` mb-8 w-24 h-24 object-cover rounded-full `}
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

          {/* 회색박스 */}
          <div className="w-full h-[230px] align-center items-center bg-gray-100 relative flex mt-10 rounded-md">
            {/* 이메일 및 닉네임 수정 */}
            <div className="flex-grow flex flex-col justify-center items-center">
              {/* 이메일 : {user.email} */}
              <div className="mt-4 font-bold">이메일 : {user?.email}</div>
              <div className="mt-4 flex items-center font-bold">
                닉네임 수정 :
                <input
                  type="text"
                  value={newNickname || ''}
                  onChange={(e) => setNewNickname(e.target.value)}
                  className="ml-2 p-2 border border-gray-300 rounded"
                />
                <button
                  onClick={handleNicknameCheck}
                  className="ml-2 px-4 py-2 bg-primary text-white rounded-[7px]"
                >
                  중복확인
                </button>
              </div>
              <div className="flex-grow flex items-end justify-center my-6">
                <Button
                  onClick={handleEditProfile}
                  color="primary"
                  size="medium"
                >
                  수정
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyEditPage;
