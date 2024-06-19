import { useState } from 'react';
import { register } from '../../api/supabaseAuth';
import { useModal } from '../../context/modal.context';
import imageSrc from './../../assets/132132.png';
import supabase from './../../config/supabase';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [errors, setErrors] = useState({});
  const modal = useModal();

  const sanitizeFileName = (fileName) => {
    return fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  };

  const handleProfileImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sanitizedFileName = `${Date.now()}-${sanitizeFileName(file.name)}`;
      const { data, error } = await supabase.storage
        .from('profile_image')
        .upload(sanitizedFileName, file);

      if (error) {
        console.error('이미지 업로드 에러:', error);
        alert('이미지 업로드에 실패했습니다.');
        return;
      }

      const { publicURL, error: urlError } = supabase.storage
        .from('profile_image')
        .getPublicUrl(sanitizedFileName);

      if (urlError) {
        console.error('URL 가져오기 에러:', urlError);
        alert('이미지 URL을 가져오는데 실패했습니다.');
        return;
      }

      setProfileImageUrl(publicURL);
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const onClickForceEmpty = () => {
    setProfileImage(null);
    setProfileImageUrl('');
  };

  const validateInputs = () => {
    const newErrors = {};
    if (email.length < 4 || email.length > 30) {
      newErrors.email = '이메일은 6글자 이상 30글자 이하여야 합니다';
    }
    if (password.length < 6 || password.length > 15) {
      newErrors.password = '비밀번호는 6~15글자여야 합니다.';
    }
    if (nickName.length < 4 || nickName.length > 10) {
      newErrors.nickName = '닉네임은 4~10글자여야 합니다.';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 동일하지 않습니다.';
    }
    return newErrors;
  };

  const onAddUser = async () => {
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
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
      confirm('회원가입이 완료 되었습니다!');
      modal.close();
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

      <div className="flex justify-center items-center h-full">
        <div className="relative inline-block">
          <button
            className="absolute inset-0 flex justify-center items-center w-6 h-6"
            onClick={onClickForceEmpty}
            style={{ zIndex: 10 }}
          >
            <span className="sr-only">Click</span>{' '}
          </button>
          <img src={imageSrc} alt="button image" className="w-6 h-6" />
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
      >
        로그인
      </a>
    </form>
  );
};

export default SignUpPage;
