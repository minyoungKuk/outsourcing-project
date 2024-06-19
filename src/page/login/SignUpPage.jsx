import { useState } from 'react';
import { register } from '../../api/supabaseAuth';
import { useModal } from '../../context/modal.context';
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

  const validateInputs = () => {
    const showErrors = {};
    if (email.length < 4 || email.length > 30) {
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
      modal.open({
        type: 'alert',
        content: '프로필 사진은 필수입니다',
        onConfirm: () => {
          return;
        },
      });
    }
    return showErrors;
  };

  const onAddUser = async () => {
    const showErrors = validateInputs();
    if (Object.keys(showErrors).length > 0) {
      setErrors(showErrors);

      return;
    } else {
      setErrors({});
    }

    const response = await register({
      email: email,
      password: password,
      nickname: nickName,
      profile_image_url: profileImageUrl,
    });

    console.log('회원가입 api 응답 :', response);
    if (response) {
      modal.open({
        type: 'alert',
        content: '회원가입이 완료 되었습니다!!!!!!!!!!!!!',
        onConfirm: () => {
          modal.close();
        },
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddUser();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg "
    >
      <div className="flex flex-col items-center">
        <label htmlFor="profileImage" className="mb-2">
          프로필 이미지
        </label>
        <div className="relative">
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-48 h-48 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
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

      <div>
        <input
          type="email"
          placeholder="이메일(6~30글자 이내)"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 px-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <label className="text-red-500 text-left text-sm flow-root">
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
          <label className="text-red-500 text-red-500 text-left text-sm  flow-root">
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
          <label className="text-red-500 text-red-500 text-left text-sm  flow-root">
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
          <label className="text-red-500 text-red-500 text-left text-sm  flow-root">
            {errors.nickName}
          </label>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
      >
        회원가입
      </button>

      <a
        href="/"
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 text-center"
        onClick={openSignInModal}
      >
        로그인
      </a>
    </form>
  );
};

export default SignUpPage;
