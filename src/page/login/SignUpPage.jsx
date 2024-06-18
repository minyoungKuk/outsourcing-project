import { useState } from 'react';
import { register } from '../../api/supabaseAuth';

const SignUpPage = () => {
  // const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');

  const onAddUser = async () => {
    if (email.length < 4 || email.length > 30) {
      alert('이메일은 4글자 이상이어야 합니다');
      return;
    } else if (password.length < 6 || password.length > 15) {
      alert('비밀번호는 6~15글자여야 합니다.');
      return;
    } else if (nickName.length < 1 || nickName.length > 10) {
      alert('닉네임은 1~10글자여야 합니다.');
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
    });
    console.log('회원가입 api 응답 :', response);
    if (response) {
      confirm('회원가입이 완료 되었습니다!');
      // navigate('/');
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
        minLength={1}
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
      <a href="/" className="text-blue-500 hover:underline">
        로그인
      </a>
    </form>
  );
};

export default SignUpPage;
