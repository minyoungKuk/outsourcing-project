import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { register } from '../../api/supabaseAuth';
import Button from '../../common/components/Button';
import { useModal } from '../../context/modal.context';
import useAuthStore from '../../zustand/authStore';
import supabase from './../../config/supabase';
import SignInPage from './SignInPage';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const modal = useModal();
  const { login: setLogin } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: register,
    onError: (e) => {
      if (e.error.message) {
        modal.open({
          type: 'alert',
          content: '무언가 잘못되었습니다',
          onConfirm: () => {
            modal.close();
          },
        });
        setErrors({ general: '무언가 잘못되었습니다' });
      }
    },

    onSuccess: async () => {
      modal.open({
        type: 'alert',
        content: '회원가입이 완료 되었습니다.',
        onConfirm: () => {
          modal.close();
        },
      });
      await setLogin(email, password);
      //로그인페이지와 다르게 로그인상태를 모달 오픈 앞에 두면 헤더의 조건부 리렌더링 발동안됨
    },
  });

  const openSignInModal = () => {
    modal.open({
      type: 'signIn',
      content: <SignInPage />,
    });
  };

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  const handleProfileImageChange = async (e) => {
    console.log('File input change event triggered'); // 추가된 로그

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log('File selected:', file); // 추가된 로그

      const sanitizedFileName = `${Date.now()}-${sanitizeFileName(file.name)}`;
      console.log('Sanitized file name:', sanitizedFileName); // 추가된 로그

      const { data, error } = await supabase.storage
        .from('profile_image')
        .upload(sanitizedFileName, file);

      if (error) {
        console.error('이미지 업로드 에러:', error);
        alert('이미지 업로드에 실패했습니다.');
        return;
      }

      console.log('File uploaded successfully:', data); // 추가된 로그

      const { path } = data;
      setProfileImageUrl(path);
      setProfileImage(URL.createObjectURL(file));
      console.log('Uploaded profile image path:', path); // 추가된 로그
    } else {
      console.log('No file selected'); // 추가된 로그
    }
  };

  const validateInputs = ({ email, password, nickName, profileImageUrl }) => {
    const showErrors = {};
    if (email.length < 6 || email.length > 30) {
      showErrors.email = '이메일은 6글자 이상 30글자 이하여야 합니다';
    }
    if (password.length < 6 || password.length > 15) {
      showErrors.password = '비밀번호는 6~15글자여야 합니다.';
    }
    if (nickName.length < 4 || nickName.length > 10) {
      showErrors.nickName = '닉네임은 4~10글자여야 합니다.';
    }
    if (password !== confirmPassword) {
      showErrors.confirmPassword = '비밀번호가 동일하지 않습니다.';
    }
    if (!profileImageUrl) {
      showErrors.profile = '프로필 사진은 필수입니다';
    }
    return showErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const showErrors = validateInputs({
      email,
      password,
      nickName,
      profileImageUrl,
    });

    if (Object.keys(showErrors).length > 0) {
      setErrors(showErrors);
      return;
    }

    console.log('회원가입 api 응답 :', showErrors);

    mutate({
      email: email,
      password: password,
      nickname: nickName,
      profile_image_url: profileImageUrl,
    });
  };

  // 참조 회원가입 라벨은 사실 프로필이미지 //
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg "
    >
      <div className="flex flex-col items-center">
        <label htmlFor="profileImage" className="mb-2 text-3xl p-8 font-bold">
          회원가입
        </label>

        <div className="relative">
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-36 h-36 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500">이미지 선택</span>
            )}
          </div>
        </div>
      </div>

      <label className="text-red-500 text-sm flow-root text-center">
        {errors.profile}
      </label>

      <div>
        <input
          type="email"
          placeholder="이메일(6~30글자 이내)"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <label className="text-red-500 text-center text-sm flow-root">
            {errors.email}
          </label>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="비밀번호(6~15글자 이내)"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <label className="text-red-500 text-red-500 text-center text-sm  flow-root">
            {errors.password}
          </label>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <label className="text-red-500 text-red-500 text-center text-sm  flow-root">
            {errors.confirmPassword}
          </label>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="닉네임(4~10글자 이내)"
          onChange={(e) => setNickName(e.target.value)}
          className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.nickName && (
          <label className="text-red-500 text-red-500 text-center text-sm  flow-root">
            {errors.nickName}
          </label>
        )}
      </div>

      <Button size="large" color="primary" type="submit">
        회원가입
      </Button>

      <Button
        size="large"
        color="primary"
        type="button"
        onClick={(e) => {
          e.preventDefault();
          openSignInModal();
        }}
      >
        로그인
      </Button>

      <img src="/images/logo2.png" alt="Logo" className="w-auto h-auto " />
    </form>
  );
};

export default SignUpPage;
