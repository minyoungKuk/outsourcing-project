import { useState } from 'react';
import { register } from '../../api/supabaseAuth';
import imageSrc from './../../assets/132132.png';
import supabase from './../../config/supabase';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [error, setError] = useState('');

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

  const onClickForceRender = () => {
    window.location.reload();
  };

  const onAddUser = async () => {
    if (email.length < 4 || email.length > 30) {
      setError('이메일은 4글자 이상 30글자 이하여야 합니다');
      return;
    } else if (password.length < 6 || password.length > 15) {
      setError('비밀번호는 6~15글자여야 합니다.');
      return;
    } else if (nickName.length < 4 || nickName.length > 10) {
      setError('닉네임은 4~10글자여야 합니다.');
      return;
    } else if (password !== confirmPassword) {
      setError('비밀번호가 동일하지 않습니다.');
      return;
    } else {
      setError('');
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
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAddUser();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
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
          <div className="w-72 h-72 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
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
            onClick={onClickForceRender}
            style={{ zIndex: 10 }}
          >
            <span className="sr-only">Click</span>{' '}
          </button>
          <img src={imageSrc} alt="button image" className="w-6 h-6" />
        </div>
      </div>

      <input
        type="email"
        placeholder="로그인아이디(4~30글자 이내)"
        minLength={4}
        maxLength={30}
        required
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="비밀번호(6~15글자 이내)"
        minLength={6}
        maxLength={15}
        required
        onChange={(e) => setPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="비밀번호 확인"
        minLength={6}
        maxLength={15}
        required
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {error && <label className="text-red-500">{error}</label>}
      <input
        type="text"
        placeholder="닉네임(1~10글자 이내)"
        minLength={4}
        maxLength={10}
        required
        onChange={(e) => setNickName(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

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
